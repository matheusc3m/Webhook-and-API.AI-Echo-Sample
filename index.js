"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());


restService.post("/echo", function (req, res) {
  var speech =
    req.body.queryResult &&
      req.body.queryResult.parameters &&
      req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";

  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };

  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

function calcularProduto(produto) {
  if (produto == 'água')
    return 2.00;
  else if (produto == 'pepsi')
    return 8.00;
  else if (produto == 'x-tudo')
    return 20.00;
  else if (produto == 'x-egg')
    return 12.00;
  else if (produto == 'x-salada')
    return 10.00;
  else return 0.00;
}
restService.post("/teste", function (req, res) {
  var intentName = req.body.queryResult.intent.displayName;
  if (intentName == 'pedido') {
    var pedido = req.body.queryResult.parameters['pedido'];
    let soma = 0
    for (let i in pedido) {
      soma += pedido[i]['number'] * calcularProduto(pedido[i]['produto'])
    }
    var selecionados = "";
    for (var i = 0; i < pedido.length; i++) {
      selecionados += '\n' + pedido[i]['number'] + ' ' + pedido[i]['produto'] + ' por R$ ' + pedido[i]['number'] * calcularProduto(pedido[i]['produto'])
    }
    res.json({
      "fulfillmentText": selecionados + '\n e o total ficou R$ ' + soma,
    });
  }
});
restService.post("/api", function (req, res) {
  var intentName = req.body.queryResult.intent.displayName;
  if (intentName == 'Default Welcome Intent') {
    res.json({ "fulfillmentText": "Hello world" })

  }
  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});






restService.listen(process.env.PORT || 8000, function () {
  console.log("Server up and listening");
});
