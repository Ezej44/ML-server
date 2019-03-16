// lib/app.ts
import express = require('express');

import { Product } from './product.class';
import { Item } from './item.class';


// Create a new express application instance
const api ='https://api.mercadolibre.com';
const app: express.Application = express();

app.get('/item/:id', function (req, res) {
	
	const request = require('request');

	
	let id = req.params.id;
	if (!id){return console.log('Necesitas proveer un parametros');}

	let server = api + '/items/' + id;


	request(server, { json: true }, (err, results, body) => {
		if (err) { return console.log(err); }
		request(server + '/description', { json: true }, (errDesc, resultsDesc, bodyDesc) => {
			if (err) { return console.log(err); }

			let salida= results.body;
			let salida_desc = resultsDesc.body

			const produc: Product= {

				author: {
					name:'Ezequiel',
					lastname:'Fabbroni'
				},
				item :{
					id: salida.id,
					title: salida.title,
					price :{
						amount:salida.price,
						currency:salida.currency_id,
						decimals:salida.price - Math.floor(salida.price),
					}
				},
				seller: {
					id:salida.seller_id,
					state:salida.seller_address.state.name,
					city_name:salida.seller_address.city.name
				},
				condition: salida.condition,
				picture: salida.pictures[0].url,
				free_shipping: salida.shipping.free_shipping,
				sold_quantity: salida.sold_quantity,
				description: salida_desc.plain_text,


			}
			res.json(produc);
		});
	});

	
});



app.get('/items', function (req, res) {
	
	const request = require('request');

	let searchParams = req.query.q;

	let server = api + '/sites/MLA/' ;
	
	if (searchParams){
		server +=  'search?q=:' + searchParams
	}


	request(server, { json: true }, (err, results, body) => {
		if (err) { return console.log(err); }
		
		let salida= results.body.results;

		const product: Product= {

			author: {
				name:'Ezequiel',
				lastname:'Fabbroni'
			}

		}

		let itemsCopy : Item [] = []
		if (!results.body.results){
			return console.log('no info')
			res.send('');
		}
		results.body.results.forEach(i=>{
			const it:Item = {
				id: i.id,
				title: i.title,
				price :{
					amount:i.price,
					currency:i.currency_id,
					decimals:i.price - Math.floor(i.price),
				},
				condition : i.condition ,
				free_shipping: i.shipping.free_shipping,
				sold_quantity: i.sold_quantity,
				seller_address: i.address.city_name,
				picture:i.thumbnail,

			}
			itemsCopy.push(it); 
		})
		product.items = itemsCopy;
		res.json(product);
	});
	
});





app.listen(3001, function () {
	console.log('Example app listening on port 3001!');
});