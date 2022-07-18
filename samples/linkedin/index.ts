import { TransformApp } from "@scramjet/types";
// import { DataStream } from "scramjet";
import { PassThrough } from "stream";
import csv from 'csv-parser';
import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import { XRapidAPIKey } from './config.json';

const sleep = (timeMs: number) => new Promise(res => setTimeout(res, timeMs));
const RATE_LIMIT_MS = 200;

interface Company {
    LinkedIn: string
}

/**
 * Get company name from LinkedIn URL
 * 
 * @param {Company} company
 * @returns {String} Company Name
 */
function getCompanyName(company: Company): String | null {
    if (company.LinkedIn) {
        const { pathname } = new URL(company.LinkedIn);

        if (pathname.indexOf('/company/') !== 0) return null;

        return pathname.match(/^\/company\/([a-zA-Z0-9\-]+)/)![1];
    }

    return null;
}


/**
 * Get company data from Rapid API
 * 
 * @param {String} companyName 
 * @returns {Object}
 */
async function getDataFromRapiAPI(companyName: String | null) {
    if (companyName === null) return null;

    const options = {
        method: 'GET',
        url: 'https://linkedin-companies-data.p.rapidapi.com/',
        params: { vanity_name: companyName },
        headers: {
            'X-RapidAPI-Key': XRapidAPIKey,
            'X-RapidAPI-Host': 'linkedin-companies-data.p.rapidapi.com',
        },
    };

    return (await axios.request(options as AxiosRequestConfig)).data
}

/** 
 * Get title, description, keywords and first 1000 characters from website
 * 
 * @param {String} url
 * @returns {Object}
 */
async function scrape(url: string) {
    if (!url) return null;

    let html;
    try {
        html = (await axios.get(url)).data;
    } catch (error) {
        // In case of an error handle it gracefully
        console.log(error);
        return null;
    }

    const $ = cheerio.load(html);
    const title = $('head > title').text();
    const description = $('meta[name="description"]').attr('content');
    const keywords = $('meta[name="keywords"]').attr('content');
    const body = $('body').text().substr(0, 1000);

    return { title, description, keywords, body };
}

const app: TransformApp = (
    input
) => {
    const out = new PassThrough({ encoding: "utf-8" });

    const stream = input.pipe(csv());

    stream.on("data", async (data) => {
        // Simple check which removes header if it's resent, i.e. if another CSV is getting processed AND it has header line.
        if (data["Organization Name"] === "Organization Name") return;

        // Deliberately slow down in order to not exceed API requests limits.
        // Rate Limit 5 requests per second => 12 seconds
        stream.pause();
        await sleep(RATE_LIMIT_MS);

        const companyName = getCompanyName(data);

        const apiResponse = await getDataFromRapiAPI(companyName);
        data.Employees = apiResponse?.employees_num;

        const webResponse = await scrape(data.Website);

        const result = { ...data, ...webResponse };

        out.write(JSON.stringify(result) + "\n");

        stream.resume();
    })
        .on('end', () => {
            console.log('CSV file successfully processed')
        });

    return out;
}


export default app;
