/*jshint esversion: 8 */
const axios = require('axios');
const cheerio = require('cheerio');
const { search_results } = require('../settings.json')

exports.search = function(arguments, receivedMessage) {

    const url =  'https://warframe.fandom.com/wiki/Special:Search?search=';
    search = arguments;
    axios.get(url+search)
        .then(response => {
            const values = Object.keys(getData(response.data)).forEach(function(key) {
            receivedMessage.channel.send(" `" + getData(response.data)[key].title + "` " + '\n' + getData(response.data)[key].link);
            console.log(" `" + getData(response.data)[key].title + "` " + '\n' + getData(response.data)[key].link);
         });
        })
        .catch(err => {
            console.log(err);
        });

    let getData = html => {
        data = [];
        const $ =  cheerio.load(html);
        $('.result').each((i, elem) => {
            if (i < search_results) {
                data.push({
                    title: $(elem).find('.result-link').attr("data-name"),
                    link: $(elem).find('.result-link').attr('href')
                });
            }
        });
        return data;
    };
}