let request = require('request');
let cheerio = require('cheerio');
let massive = require('massive');

let initialURL = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dcollectibles&field-keywords=-z'

let info = 'test';
let nextURL = '';
let productURLs = [];
let pageNumber = 1
let numberOfPages = 1

getNextPageInitialize(initialURL)

function getNextPageInitialize(url) {
    req = request.defaults({
        jar:true,
        rejectUnauthorized: false,
        followAllRedirects:true
    })
    // if (pageNumber > 3 ) {
    //     console.log(productURLs)
    //     return
    // }
    req.get({
        url: url,
        uri: url,
        headers: {
            'User-Agent': 'Chrome/41.0.2228.0'
        }
    }, function(err, res, body) {
        
        if (err) {
            console.log(err)
            return
        } else if (res.statusCode === 200) { 
            // console.log(res)
        // } else {
            let $ = cheerio.load(body);
            // console.log($('a.s-access-detail-page', '#atfResults'))
            $('a.s-access-detail-page', '#atfResults').each(function() {
                info = $(this).attr('href');
                // info.split('?')
                productURLs.push(info)
            });
            $('a.pagnNext', '#bottomBar').each(function() {
                relevantPath = $(this).attr('href');
                let re = new RegExp('\/.*(\/.*)')
                nextURL = 'https://www.amazon.com' + relevantPath.match(re)[1]
                console.log(nextURL)
            });
            numberOfPages = $('.pagnDisabled').text()
            pageNumber++;
            // console.log(nextURL)
            getNextPage(nextURL)
            startCrawl()
            // startCrawl2()
            // startCrawl3()
            // startCrawl4()
            // setTimeout(getNextPage2, 500, nextURL)
        }
    })
}

function getNextPage(url) {
    req = request.defaults({
        jar:true,
        rejectUnauthorized: false,
        followAllRedirects:true
    })
    if (pageNumber > 3 ) {
        console.log(numberOfPages)
        return
    }
    req.get({
        url: url,
        uri: url,
        headers: {
            'User-Agent': 'Chrome/41.0.2228.0'
        }
    }, function(err, res, body) {
        
        if (err) {
            console.log(err)
            return
        } else if (res.statusCode === 200) { 
            // console.log(res)
        // } else {
            let $ = cheerio.load(body);
            // console.log($('a.s-access-detail-page', '#atfResults'))
            $('a.s-access-detail-page', '#atfResults').each(function() {
                info = $(this).attr('href');
                // info.split('?')
                productURLs.push(info)
            });
            $('a.pagnNext', '#bottomBar').each(function() {
                relevantPath = $(this).attr('href');
                let re = new RegExp('\/.*(\/.*)')
                nextURL = 'https://www.amazon.com' + relevantPath.match(re)[1]
                console.log(nextURL)
            });
            pageNumber++;
            // console.log(nextURL)
            getNextPage(nextURL)
        }
    })
}

function startCrawl() {
    if (productURLs.length === 0) {
        return
    } else {
        let url = productURLs.shift()
        console.log('startCrawl hit', url)
        req = request.defaults({
            jar: true,
            rejecUnauthorized: false,
            followAllRedirects: true
        });
        req.get({
            url: url,
            uri: url,
            headers: {
                'User-Agent': 'Chrome/41.0.2228.0'
            }
        }, function(err, res, body) {           
            if (err) {
                console.log(err)
                return
            } else if (res.statusCode === 200) { 
                let $ = cheerio.load(body);
                $('a.s-access-detail-page', '#atfResults').each(function() {
                    info = $(this).attr('href');
                    productURLs.push(info)
                });
                $('a.pagnNext', '#bottomBar').each(function() {
                    relevantPath = $(this).attr('href');
                    let re = new RegExp('\/.*(\/.*)')
                    nextURL = 'https://www.amazon.com' + relevantPath.match(re)[1]
                    console.log(nextURL)
                });
                pageNumber++;
                getNextPage(nextURL)
            }
        })
    }
    
}

// function getNextPage2(url) {
//     req = request.defaults({
//     jar:true,
//     rejectUnauthorized: false,
//     followAllRedirects:true
// })
//     if (pageNumber > 3 ) {
//         return
//     }
//         req.get({
//         url: url,
//         uri: url,
//         headers: {
//             'User-Agent': 'Chrome/41.0.2228.0'
//         }
//     }, function(err, res, body) {
        
//         if (err) {
//             console.log(err)
//             return
//         } else if (res.statusCode === 200) { 
//             // console.log(res)
//         // } else {
//             let $ = cheerio.load(body);
//             // console.log($('a.s-access-detail-page', '#atfResults'))
//             $('a.s-access-detail-page', '#atfResults').each(function() {
//                 info = $(this).attr('href');
//                 // info.split('?')
//                 productURLs.push(info)
//             });
//             $('a.pagnNext', '#bottomBar').each(function() {
//                 relevantPath = $(this).attr('href');
//                 let re = new RegExp('\/.*(\/.*)')
//                 nextURL = 'https://www.amazon.com' + relevantPath.match(re)[1]
//                 console.log(nextURL)
//             });
//             pageNumber++;
//             // console.log(nextURL)
//             getNextPage2(nextURL)
//         }
//     })
// }








// function getProductURLs() {
//     if (pageNumber > 400) {
//         //do this
//     } else {
//         req.get({
//             url: nextURL,
//             headers: {
//                 'User-Agent': 'Chrome/41.0.2228.0'
//             }
//         }, function(err, res, body) {
//             if (err) {
//                 console.log(err)
//                 return
//             } else if (res.statusCode === 200) { 
//                 // console.log(res)
//             // } else {
//                 let $ = cheerio.load(body);
//                 // console.log($('a.s-access-detail-page', '#atfResults'))
//                 $('a.s-access-detail-page', '#atfResults').each(function() {
//                     info = $(this).attr('href');
//                     // info.split('?')
//                     productURLs.push(info)
//                 });
//                 $('a.pagnNext', '#bottomBar').each(function() {
//                     nextURL = $(this).attr('href');
//                 });
//                 pageNumber ++
//                 console.log(nextURL, pageNumber);
//                 setTimeout(getProductURLs(), 500);
//             }
//         })
//     }
// }














// let request = require('request');
// let cheerio = require('cheerio');

// // let initialURL = 'https://www.ksl.com/auto/search/index?p=&make[]=Toyota&model[]=Corolla&miles=10000&newUsed[]=Used&newUsed[]=Certified&page=0&cx_navSource=hp_search'
// // let initialURL = 'https://www.reddit.com'
// let initialURL = 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dcollectibles&field-keywords=-z'

// let info = 'test'
// productURLs = []

// request(initialURL, function(err, res, body) {
//     if (err) {
//         console.log(err)
//         return
//     } else if (res) { 
//         console.log(res)
//     } else {
//         let $ = cheerio.load(body);
//         $('a.s-access-detail-page', '#atfResults').each(function() {
//             info = $(this).attr('href');
//             // console.log('hi')
//             // console.log(info)
//             productURLs.push(info)
//         });
//         console.log(productURLs)
//     }
// })