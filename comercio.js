const puppeteer = require('puppeteer');
const jsdom = require('jsdom');


async function getData (url) {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch() ;
    const page = await browser.newPage();
    const response = await page.goto(url);
    const body = await response.text();
    let result = {img: '', title: '', description: '', articleBody: ''};
    // Creamos una instancia del resultado devuelto por puppeter para parsearlo con jsdom
    const { window: { document } } = new jsdom.JSDOM(body);
    // s-multimedia__image w-full o-cover
    document.querySelectorAll('img.s-multimedia__image').forEach(element => {
      result.img = element.attributes.getNamedItem('src').value;
    } );
    // Seleccionamos los titulos y lo mostramos en consola
    document.querySelectorAll('script').forEach(element => {
        if(element.textContent.indexOf('ReportageNewsArticle') >= 0 || element.textContent.indexOf('NewsArticle') >= 0) {
            const objArticule = JSON.parse(element.textContent)
            result.title = objArticule.headline;
            result.description = objArticule.description;
            result.articleBody =  objArticule.articleBody;
        }
    })

    // Cerramos el puppeteer
    await browser.close();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getData }