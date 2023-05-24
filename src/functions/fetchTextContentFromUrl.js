import https from "https";
import * as cheerio from 'cheerio';

const fetchTextContentFromUrl = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let html = '';
            response.on('data', (chunk) => {
                html += chunk;
            });
            response.on('end', () => {
                const $ = cheerio.load(html);
                
                $('script').remove();
                $('noscript').remove();
                $('img').remove();
                $('svg').remove();
                $('video').remove();
                $('audio').remove();
                $('use').remove();
                $('input').remove();
                $('meta').remove();
                $('link').remove();
                $('style').remove();
                $('a').remove();
                $('head').remove();
                //console.log($.html().toString().substring(0,3000));

                const textContent = $('body').text().replace(/\n|\t/g, '').replace(/\s+/g, ' ').trim();
                console.log(textContent.split(" ").length);
                resolve(textContent);
            });
        }).on('error', (error) => {
            console.error(`Failed to fetch website: ${url}`, error);
            reject(error);
        });
    });
}

export default fetchTextContentFromUrl;