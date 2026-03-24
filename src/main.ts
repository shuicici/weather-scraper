import { Dataset, Actor, log } from 'apify';
import { PlaywrightCrawler } from 'crawlee';

interface Input {
    location: string;
}

async function main() {
    await Actor.init();
    const input = await Actor.getInput<Input>();
    if (!input?.location) throw new Error('Location required');
    
    const url = `https://www.weather.com/weather/today/l/${encodeURIComponent(input.location)}`;
    
    const crawler = new PlaywrightCrawler({
        maxConcurrency: 1,
        requestHandlerTimeoutSecs: 90,
        requestHandler: async ({ page }) => {
            await page.waitForSelector('.CurrentConditions', { timeout: 30000 }).catch(() => {});
            
            const weather = await page.evaluate(() => {
                const temp = document.querySelector('.CurrentConditions--tempValue--M2-X');
                const cond = document.querySelector('.CurrentConditions--phraseValue--2xXS');
                const hum = document.querySelector('.CurrentConditions--humidity--3Jgk');
                const wind = document.querySelector('.CurrentConditions--wind--2mpBL');
                return {
                    temperature: temp?.textContent?.trim(),
                    condition: cond?.textContent?.trim(),
                    humidity: hum?.textContent?.trim(),
                    wind: wind?.textContent?.trim()
                };
            });
            
            await Dataset.pushData({ location: input.location, weather });
            log.info('Weather data extracted');
        }
    });
    
    await crawler.run([{ url }]);
    await Actor.exit();
}
main().catch(e => { console.error(e); process.exit(1); });
