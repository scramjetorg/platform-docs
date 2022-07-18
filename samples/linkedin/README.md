# Linkedin

Sequence that reads CSV input (e.g. dump of companies from crunchbase), uses RapidAPI to gather additional data from LinkedIn and outputs aggregated details.

## Pre-configuration

Create `config.json` file with following content:
```json
{
    "XRapidAPIKey": YOUR_RAPID_API_KEY_GOES_HERE
}

```

## Running

Open three terminals and run the following commands:

**The First Terminal:**

```bash
# start sth by executing command...
scramjet-transform-hub

# ...or use script
cd transform-hub
yarn start -P 8000
```

**The Second terminal**

```bash
# go to 'crypto-prices' directory
cd samples/linkedin

# install dependencies
npm install

# transpile TS->JS and copy node_modules and package.json to dist/
npm run build

# deploy the Sequence from the dist/ directory, which contains transpiled code, package.json and node_modules
si seq deploy dist
# copy instance _id - you'll use this in 3rd terminal window

# see the Instance output
si inst output -
```

**The third terminal**

```bash
# replace INSTANCE_ID with actual instance ID and pipe CSV output to instance input
cat companies.csv | si inst input INSTANCE_ID
```

**Rapid API**

Example response:

```
{
  schema_version: 13,
  profile_id: '50ed2922fc4156a1',
  updated_month: '2022-06',
  company_name: 'Microsoft',
  industry: 'Software Development',
  categories: [ 'Software Development' ],
  slogan: null,
  about_us: "Every company has a mission. What's ours? To empower every person and every organization to achieve more. We believe technology can and should be a force for good and that meaningful innovation contributes to a brighter world in the future and today. Our culture doesn’t just encourage curiosity; it embraces it. Each day we make progress together by showing up as our authentic selves. We show up with a learn-it-all mentality. We show up cheering on others, knowing their success doesn't diminish our own. We show up every day open to learning our own biases, changing our behavior, and inviting in differences. When we show up, we achieve more together. Microsoft operates in 190 countries and is made up of 181,000 passionate employees worldwide.",
  specialties: [
    'Business Software',
    'Developer Tools',
    'Home & Educational Software',
    'Tablets',
    'Search',
    'Advertising',
    'Servers',
    'Windows Operating System',
    'Windows Applications & Platforms',
    'Smartphones',
    'Cloud Computing',
    'Quantum Computing',
    'Future of Work',
    'Productivity',
    'AI',
    'Artificial Intelligence',
    'Machine Learning',
    'Laptops',
    'Mixed Reality',
    'Virtual Reality',
    'Gaming',
    'Developers',
    'IT Professional'
  ],
  headquarters: 'Redmond, Washington',
  locations: [
    {
      address: '1 Microsoft Way',
      address_2: 'Redmond, Washington 98052, US',
      primary: true
    },
    {
      address: 'Thames Valley Park Drive',
      address_2: 'Reading, Berkshire RG6 1WG, GB',
      primary: false
    },
    {
      address: 'One Microsoft Place',
      address_2: 'South County Business Park Leopardstown, Dublin 18 D18, IE',
      primary: false
    },
    {
      address: 'Luchthavenlaan 1k',
      address_2: 'Zaventem, Flemish Region 1930, BE',
      primary: false
    },
    {
      address: '3012 William Nicol Drive',
      address_2: 'Johannesburg, Gauteng 2191, ZA',
      primary: false
    },
    {
      address: 'Viale Pasubio, 21',
      address_2: 'Milan, Lombardy 20154, IT',
      primary: false
    },
    {
      address: 'Evert van de Beekstraat 354',
      address_2: 'Schiphol, North Holland 1118 CZ, NL',
      primary: false
    },
    {
      address: '1 Denison Street',
      address_2: 'North Sydney, NSW 2060, AU',
      primary: false
    },
    {
      address: '1950 Meadowvale Blvd',
      address_2: 'Mississauga, Ontario L5N 8L9, CA',
      primary: false
    },
    {
      address: '50, Jongro 1-gil',
      address_2: 'Jongno-gu, Seoul, KR',
      primary: false
    },
    {
      address: 'Zhongxiao East Road Section 5 No. 68',
      address_2: 'Xinyi District, Taipei City, TW',
      primary: false
    },
    {
      address: '2-16-3 Konan',
      address_2: 'Minato-ku, Tokyo 108-0075, JP',
      primary: false
    },
    {
      address: '39, Quai du Président Roosevelt',
      address_2: 'Issy-les-Moulineaux, Île-de-France 92130, FR',
      primary: false
    },
    {
      address: 'Kanalvej 7',
      address_2: '2800 Kongens Lyngby, DK',
      primary: false
    },
    {
      address: '22 Viaduct Harbour Avenue',
      address_2: 'Auckland, NZ',
      primary: false
    },
    {
      address: 'Calle 92 # 11 – 51',
      address_2: 'Bogota, CO',
      primary: false
    },
    {
      address: 'Pradiareň 1900',
      address_2: 'Svätoplukova 2A Bratislava, SK',
      primary: false
    },
    {
      address: 'Bulevardul Iuliu Maniu nr. 6P',
      address_2: 'Clădirea Campus 6.2 București, RO',
      primary: false
    },
    {
      address: '1106 Federal Capital',
      address_2: 'Bouchard 710 Buenos Aires, AR',
      primary: false
    },
    {
      address: 'Kilo 28, Cairo/Alex Desert Road',
      address_2: 'Abou Rawash Cairo, EG',
      primary: false
    },
    {
      address: 'Av. Vasco de Quiroga 3200',
      address_2: 'Col. Centro de Ciudad Santa Fe Del Álvaro Obregón, MX',
      primary: false
    },
    {
      address: 'Sheikh Zayed Road',
      address_2: 'Dubai Internet City, Building No 8 Dubai, AE',
      primary: false
    },
    {
      address: 'Keilalahdentie 2-4',
      address_2: 'Espoo, FI',
      primary: false
    },
    {
      address: 'DLF Building No.5 (Epitome), Cyber City, DLF Phase III',
      address_2: 'Gurgaon, IN',
      primary: false
    },
    {
      address: '100 Cyberport Road',
      address_2: '15/F, Cyberport 2 Hong Kong, HK',
      primary: false
    },
    {
      address: 'Aydın Sokak No:7',
      address_2: 'Bellevue Residences, Levent Mahallesi İstanbul, TR',
      primary: false
    },
    {
      address: 'Jl. Jend. Sudirman Kav. 52-53',
      address_2: 'Jakarta Stock Exchange Building Tower II Jakarta, ID',
      primary: false
    },
    {
      address: 'No. 211, Jalan Tun Sambanthan',
      address_2: 'Menara Shell Kuala Lumpur, MY',
      primary: false
    },
    {
      address: 'Rua do Fogo de Santelmo, Lote 2.07.02',
      address_2: 'Lisboa, PT',
      primary: false
    },
    {
      address: 'Ayala Avenue cor Edsa, Brgy. San Lorenzo,',
      address_2: '11F, One Ayala East Tower Makati City, PH',
      primary: false
    },
    {
      address: 'Walter-Gropius-Straße 5',
      address_2: 'München, DE',
      primary: false
    },
    {
      address: 'Dronning Eufemia gate 71',
      address_2: 'Oslo, NO',
      primary: false
    },
    {
      address: 'Paseo del Club Deportivo, 1',
      address_2: 'Centro Empresarial La Finca - Edificio 1 Pozuelo de Alarcón, ES',
      primary: false
    },
    {
      address: 'The Business Gate, Building A2 Airport Road, Cordobah',
      address_2: 'Riyadh, SA',
      primary: false
    },
    {
      address: 'Av. Vitacura 6844',
      address_2: 'Santiago, CL',
      primary: false
    },
    {
      address: 'Av. President Juscelino Kubitscheck, 1909',
      address_2: 'Sao Paulo, BR',
      primary: false
    },
    {
      address: '182 Cecil Street',
      address_2: '#13-01 Frasers Tower Singapore, SG',
      primary: false
    },
    {
      address: 'Regeringsgatan 25',
      address_2: 'Stockholm, SE',
      primary: false
    },
    {
      address: 'Am Europlatz 3',
      address_2: 'Vienna, AT',
      primary: false
    },
    {
      address: 'Al. Jerozolimskie 195a',
      address_2: 'Warszawa, PL',
      primary: false
    },
    {
      address: '8058 Zürich-Flughafen',
      address_2: 'The Circle 02 Zürich, CH',
      primary: false
    },
    {
      address: 'Ул. Крылатская, 17',
      address_2: 'Москва, RU',
      primary: false
    },
    {
      address: '87/2 ถนนวิทยุ แขวงลุมพินี',
      address_2: 'ตึก CRC Tower ออลซีซันส์เพลส เขตปทุมวัน กรุงเทพฯ, TH',
      primary: false
    }
  ],
  country_code: 'us',
  website: 'https://news.microsoft.com/',
  social_followers: 17078947,
  social_url: 'https://www.linkedin.com/company/microsoft',
  image_url: 'https://media-exp2.licdn.com/dms/image/C560BAQE88xCsONDULQ/company-logo_200_200/0/1618231291419?e=2147483647&v=beta&t=vc_FjmDR3a48QsN0A5l29y7i07b2NmcTJQrCVCl4jC8',
  cover_image_url: 'https://media-exp1.licdn.com/dms/image/C4E1BAQHaIwXiBIfneg/company-background_10000/0/1649867843118?e=2147483647&v=beta&t=5dQMlpZvR97l9F5ORTCGXjxZpvMoHyFPGMRjJITQcOg',
  crunchbase_url: 'https://www.crunchbase.com/organization/microsoft',
  type: 'Public Company',
  founded: null,
  stock_symbol: 'MSFT',
  company_size: '10001+',
  employees_num: 218340,
  employees: [
    {
      full_name: 'Reid Hoffman',
      position: 'Entrepreneur. Product and Business…',
      location: null,
      social_url: 'https://www.linkedin.com/in/reidhoffman',
      image_url: null
    },
    {
      full_name: 'Nikesh Parekh',
      position: 'General Manager, Dynamics 365 Finance…',
      location: null,
      social_url: 'https://www.linkedin.com/in/nparekh',
      image_url: null
    },
    {
      full_name: 'Ian McCarthy',
      position: 'Product coauthor and entrepreneur',
      location: null,
      social_url: 'https://www.linkedin.com/in/ianmccarthy',
      image_url: null
    },
    {
      full_name: 'Tim Bakke',
      position: 'Content Lead, Modern Workplace and…',
      location: null,
      social_url: 'https://www.linkedin.com/in/timbakke',
      image_url: null
    }
  ],
  affiliated_companies: [
    {
      company_name: 'GitHub',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/company/github',
      image_url: null
    },
    {
      company_name: 'Microsoft Cloud',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-cloud-platform',
      image_url: null
    },
    {
      company_name: 'Microsoft Learn',
      industry: 'IT Services and IT Consulting',
      social_url: 'https://www.linkedin.com/showcase/microsoftlearn',
      image_url: null
    },
    {
      company_name: 'Microsoft 365',
      industry: 'IT Services and IT Consulting',
      social_url: 'https://www.linkedin.com/showcase/microsoft-365',
      image_url: null
    },
    {
      company_name: 'Microsoft Visual Studio',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-visual-studio',
      image_url: null
    },
    {
      company_name: 'Microsoft Developers',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-developers',
      image_url: null
    },
    {
      company_name: 'Microsoft Dynamics 365',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-dynamics',
      image_url: null
    },
    {
      company_name: 'Microsoft Security',
      industry: 'IT Services and IT Consulting',
      social_url: 'https://www.linkedin.com/showcase/microsoft-security',
      image_url: null
    },
    {
      company_name: 'Microsoft Partner Network',
      industry: 'IT Services and IT Consulting',
      social_url: 'https://www.linkedin.com/showcase/microsoft-partner-network',
      image_url: null
    },
    {
      company_name: 'Microsoft Power Platform',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-power-platform',
      image_url: null
    },
    {
      company_name: 'Microsoft SQL Server',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/msft-sql-server',
      image_url: null
    },
    {
      company_name: 'Microsoft Surface',
      industry: 'Computer Hardware Manufacturing',
      social_url: 'https://www.linkedin.com/showcase/microsoft-surface',
      image_url: null
    },
    {
      company_name: 'Microsoft Advertising',
      industry: 'Advertising Services',
      social_url: 'https://www.linkedin.com/showcase/microsoft-advertising',
      image_url: null
    },
    {
      company_name: 'Microsoft in Government',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-in-government',
      image_url: null
    },
    {
      company_name: 'Microsoft for Healthcare',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-health',
      image_url: null
    },
    {
      company_name: 'Microsoft On the Issues',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-on-the-issues',
      image_url: null
    },
    {
      company_name: "M12 - Microsoft's Venture Fund",
      industry: 'Venture Capital and Private Equity Principals',
      social_url: 'https://www.linkedin.com/company/m12vc',
      image_url: null
    },
    {
      company_name: 'Microsoft Viva',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-viva',
      image_url: null
    },
    {
      company_name: 'COVID-19 Business Resource Center',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/covid19-business-resource-center',
      image_url: null
    },
    {
      company_name: 'Microsoft Windows',
      industry: 'Software Development',
      social_url: 'https://www.linkedin.com/showcase/microsoft-windows',
      image_url: null
    },
    {
      company_name: 'Metaswitch Networks',
      industry: 'Telecommunications',
      social_url: 'https://www.linkedin.com/company/metaswitch-networks',
      image_url: null
    },
    {
      company_name: 'Flipgrid',
      industry: 'E-Learning Providers',
      social_url: 'https://www.linkedin.com/company/flipgrid',
      image_url: null
    },
    {
      company_name: 'Microsoft Research',
      industry: 'Research Services',
      social_url: 'https://www.linkedin.com/showcase/microsoftresearch',
      image_url: null
    },
    {
      company_name: 'Studios Quality - Xbox Game Studios',
      industry: 'Computer Games',
      social_url: 'https://www.linkedin.com/company/studios-quality',
      image_url: null
    },
    {
      company_name: 'Microsoft Military Affairs',
      industry: 'IT Services and IT Consulting',
      social_url: 'https://www.linkedin.com/showcase/microsoft-military-affairs',
      image_url: null
    }
  ],
  similar_companies: [
    {
      company_name: 'Google',
      industry: 'Internet Publishing',
      location: 'Mountain View, CA',
      social_url: 'https://www.linkedin.com/company/google',
      image_url: null
    },
    {
      company_name: 'Amazon',
      industry: 'Internet Publishing',
      location: 'Seattle, WA',
      social_url: 'https://www.linkedin.com/company/amazon',
      image_url: null
    },
    {
      company_name: 'Apple',
      industry: 'Computers and Electronics Manufacturing',
      location: 'Cupertino, California',
      social_url: 'https://www.linkedin.com/company/apple',
      image_url: null
    },
    {
      company_name: 'IBM',
      industry: 'IT Services and IT Consulting',
      location: 'Armonk, New York, NY',
      social_url: 'https://www.linkedin.com/company/ibm',
      image_url: null
    },
    {
      company_name: 'Meta',
      industry: 'Internet Publishing',
      location: 'Menlo Park, CA',
      social_url: 'https://www.linkedin.com/company/meta',
      image_url: null
    },
    {
      company_name: 'Netflix',
      industry: 'Entertainment Providers',
      location: 'Los Gatos, CA',
      social_url: 'https://www.linkedin.com/company/netflix',
      image_url: null
    },
    {
      company_name: 'Oracle',
      industry: 'IT Services and IT Consulting',
      location: 'Austin, Texas',
      social_url: 'https://www.linkedin.com/company/oracle',
      image_url: null
    },
    {
      company_name: 'Amazon Web Services (AWS)',
      industry: 'IT Services and IT Consulting',
      location: 'Seattle, WA',
      social_url: 'https://www.linkedin.com/company/amazon-web-services',
      image_url: null
    },
    {
      company_name: 'LinkedIn',
      industry: 'Internet Publishing',
      location: 'Sunnyvale, CA',
      social_url: 'https://www.linkedin.com/company/linkedin',
      image_url: null
    },
    {
      company_name: 'Deloitte',
      industry: 'Business Consulting and Services',
      location: null,
      social_url: 'https://www.linkedin.com/company/deloitte',
      image_url: null
    }
  ],
  company_id: 1386954
}
```

**Notes**

TBC: `employees_num` is that total company employees?

Example:

Rapid API returns (for microsoft): `"employees_num": 218340`

At the same time on LinkedIn: `220,828 on LinkedIn` with this info note:

> Includes members with current employer listed as Microsoft, including part-time roles. Also includes employees from subsidiaries: GitHub,6Wunderkinder,Parature and 20 more.

Rapid API returns website as: `https://news.microsoft.com/` (that's not correct)
Use website from CSV input.

To match CSV -> LinkedIn use LinkedIn column - regexp to extarct comapny name (`vanity_name` parameter) required by RapidAPI.
