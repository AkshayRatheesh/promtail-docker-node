
const { request, response } = require("express");
const express = require("express");
const app = express();

const client = require('prom-client');

let register = new client.Registry();

let headsCount = new client.Counter({
    name: "heads_count",
    help: "number of heads"
});

let tailsCount = new client.Counter({
    name: "tails_count",
    help: "number of tails"
});

let flipCount = new client.Counter({
    name: "flip_count",
    help: "number of flip"
});

console.log("akshay ratheesh test888888888  8888888 8888888 8888888888 888888888  8888888 8888888 8888888888");

register.registerMetric(headsCount);
register.registerMetric(tailsCount);
register.registerMetric(flipCount);


register.setDefaultLabels({
    app: 'coin-api'
})

client.collectDefaultMetrics({register});

// end



app.get('/', (request, response) => {
  response.send("helo");
});

app.get('/flip-coin',(request, response)=>{
    let randomNumber= Math.random();
    let heads= Math.random();
    let tails=Math.random();
    flipCount.inc(Number(randomNumber));
    headsCount.inc(Number(heads));
    tailsCount.inc(Number(tails));
    let coinValue="";
    if (randomNumber<0.5){
        coinValue="heads";
    }else{
        coinValue="tail";
    }
    response.send(coinValue);
});


app.get('/metrics', async(request,response)=>{
    response.setHeader('Content-type', register.contentType);
    response.end(await register.metrics());
});

app.listen(5000, () => {
    console.log('started server. listening on port 5000');
});

