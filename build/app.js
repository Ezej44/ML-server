"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
var express = require("express");
// Create a new express application instance
var api = 'https://api.mercadolibre.com';
var app = express();
app.get('/item/:id', function (req, res) {
    var request = require('request');
    var id = req.params.id;
    if (!id) {
        return console.log('Necesitas proveer un parametros');
    }
    var server = api + '/items/' + id;
    request(server, { json: true }, function (err, results, body) {
        if (err) {
            return console.log(err);
        }
        request(server + '/description', { json: true }, function (errDesc, resultsDesc, bodyDesc) {
            if (err) {
                return console.log(err);
            }
            var salida = results.body;
            var salida_desc = resultsDesc.body;
            var produc = {
                author: {
                    name: 'Ezequiel',
                    lastname: 'Fabbroni'
                },
                item: {
                    id: salida.id,
                    title: salida.title,
                    price: {
                        amount: salida.price,
                        currency: salida.currency_id,
                        decimals: salida.price - Math.floor(salida.price),
                    }
                },
                seller: {
                    id: salida.seller_id,
                    state: salida.seller_address.state.name,
                    city_name: salida.seller_address.city.name
                },
                condition: salida.condition,
                picture: salida.pictures[0].url,
                free_shipping: salida.shipping.free_shipping,
                sold_quantity: salida.sold_quantity,
                description: salida_desc.plain_text,
            };
            res.json(produc);
        });
    });
});
app.get('/items', function (req, res) {
    var request = require('request');
    var searchParams = req.query.q;
    var server = api + '/sites/MLA/';
    if (searchParams) {
        server += 'search?q=:' + searchParams + '&limit=4';
    }
    request(server, { json: true }, function (err, results, body) {
        if (err) {
            return console.log(err);
        }
        var salida = results.body.results;
        var product = {
            author: {
                name: 'Ezequiel',
                lastname: 'Fabbroni'
            }
        };
        var itemsCopy = [];
        if (!results.body.results) {
            return console.log('no info');
            res.send('');
        }
        results.body.results.forEach(function (i) {
            var it = {
                id: i.id,
                title: i.title,
                price: {
                    amount: i.price,
                    currency: i.currency_id,
                    decimals: i.price - Math.floor(i.price),
                },
                condition: i.condition,
                free_shipping: i.shipping.free_shipping,
                sold_quantity: i.sold_quantity,
                seller_address: i.address.city_name,
                picture: i.thumbnail,
            };
            itemsCopy.push(it);
        });
        product.items = itemsCopy;
        res.json(product);
    });
});
app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
