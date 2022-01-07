import asyncio
from scramjet.streams import Stream

class Count():
    def __init__(self, start, max) -> None:
        self.start = start
        self.count = start
        self.max = max
    async def __aiter__(self):
        while self.count < self.max+1:
            yield self.count
            self.count += 1
            await asyncio.sleep(1)

def run(start=0, max=10):
    return Stream.read_from(Count(start, max)).map(str)
