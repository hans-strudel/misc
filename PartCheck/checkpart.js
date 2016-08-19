// Hans Strausl @ Bestronics 2015
// Scrapes multiple supplier sites to get info on a part

data = new Array(100)

var request = require('request'),
	cheerio = require('cheerio'),
	http = require('http')

var NewarkApiKey = '6pqzrh7bqb54b2u6vtev6zp6', 
	FINAL = 'GARBLE'
getInfo = function(supp, part, nnn){ //supplier and part#
	data.fill('UND')
	if (!(supp && part || part)) console.log('Not enough arguments supplied')
	switch (supp){
		case 'dk':
			console.log('Digi-Key')
			var url = 'http://www.digikey.com/product-search/en?keywords=' + part
			request(url, function(error, response, body){
				if (!error) {
					var $ = cheerio.load(body)
					$('.attributes-table-main').find('tr').each(function(i, elem){
					if ($(this).find('th').text().trim() == 'Mounting Type'){
						//data[part] = $(this).find('td').text()
						data.splice(nnn,0,$(this).find('td').text())
						//FINAL = $(this).find('td').text()
					}
					});
				} else {
					console.log('Error: ', error)
				}
			})
			break;
		case 'nw':
			var found, probable
			console.log('Newark')
			url = 'http://api.element14.com//catalog/products?term=manuPartNum:'
				  + part + 
				  '&storeInfo.id=www.newark.com&resultsSettings.offset=0&resultsSettings.numberOfResults=1&resultsSettings.responseGroup=large&callInfo.omitXmlSchema=false&callInfo.responseDataFormat=JSON&callinfo.apiKey='
				  + NewarkApiKey
			http.get(url, function(res){
				var body = ''
				res.on('data', function(chunk){
					body += chunk
				});
				res.on('end', function(){
					if (body.charCodeAt(0) != 31) {
						var data = JSON.parse(body)
						data.manufacturerPartNumberSearchReturn.products[0].attributes.forEach(function(elem, i, a){
							if (elem.attributeLabel.trim() == 'Contact Termination Type'){
								found = true
								//FINAL = elem.attributeValue
								//data[part] = elem.attributeValue
								console.log(5)
								data.splice(nnn,0,elem.attributeValue)
							}
							if (elem.attributeLabel.toUpperCase().search('PIN') > -1) probable = 'Through Hole'	// if it has pins it is most likely through hole
						})
						if (!found) console.log('No Contact Termination Type listing found, most likely: ', FINAL = probable)
					} else {
						console.log('Error: Server returned gibberish')
					}		
				});
			}).on('error', function(error){
				console.log('Error : ', error)
			});
			
			break;
		case 'ms':
			console.log('Mouser')
			var options = {
				url: 'http://www.mouser.com/search/ProductDetail.aspx?R=' + part,
				headers: {                      	// when the webpage sees the User-Agent as 'node.js'
					'User-Agent': 'Mozilla/5.0' 	// (and presumably and other non-browser client) it
				}									// returns a 404 page
			}
			request(options, function(error, response, body){
				if (!error){
					$ = cheerio.load(body)
					$('.specs').find('tr').each(function(i, elem){
						if ($(this).find('.leftcol').text().trim() == 'Termination Style:'){
							data.splice(nnn,0,$(this).find('.ProductDetailData').text())
						}
					});
				} else {
					console.log('Error: ', error)
				}
			})
			break;
			default:
				console.log('Supplier \'' + supp + '\' Not Found')
			break;
	}
}

getInfo(process.argv[2], process.argv[3])