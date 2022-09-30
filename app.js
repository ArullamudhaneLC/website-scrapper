const axios = require("axios");
const cheerio = require("cheerio");

const fetchShelves = async () => {
   try {

       const products = ['shelves', 'shirts', 'shoes', 'books', 'toys'];
       const shelves = [];
      for (const i of products) {
           console.log(i);

       const response = await axios.get('https://www.amazon.com/s?crid=36QNR0DBY6M7J&k='+i+'&ref=glow_cls&refresh=1&sprefix=s%2Caps%2C309');
      
       const html = response.data;
    //    console.log(html);
       const $ = cheerio.load(html);

      

 $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20').each((_idx, el) => {
           const shelf = $(el)
        //    console.log(shelf);
           const title = shelf.find('div.a-section.a-spacing-none.a-spacing-top-small > h2 > a > span').text();
        //    console.log(title,'=====');
           const image = shelf.find('img.s-image').attr('src')

const link = shelf.find('a.a-link-normal.a-text-normal').attr('href')

const reviews = shelf.find('div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-small').children('span').last().attr('aria-label')

const stars = shelf.find('div.a-section.a-spacing-none.a-spacing-top-micro > div > span').attr('aria-label')

const price = shelf.find('span.a-price > span.a-offscreen').text()
const product = i;


    let element = {
        product,
        title,
        image,
        link: `https://amazon.com${link}`,
        price,
    }

    if (reviews) {
        // console.log(reviews);
        element.reviews = reviews
    }

    if (stars) {
        // console.log(stars);
        element.stars = stars
    }
// console.log(element);
           shelves.push(element)
       });
    } 

       return shelves;
   } catch (error) {
       throw error;
   }
};

 fetchShelves().then((shelves) => console.log(shelves));
