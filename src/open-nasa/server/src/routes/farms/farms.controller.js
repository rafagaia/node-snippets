// Mocked DB data: const model = ('../models/farms.model');

//should be in .service.js file:
const { get } = require('https');

//@TODO: get it from environment variable?
const EXTERNAL_API_URL = "https://data.ct.gov/resource/y6p2-px98.json/";


function getFarms(req, res) {
    res.send('[FarmsController] getFarms detault');
}

async function getFarmsByFruitname(req, res) {
    let data = [];
    if (req.params.fruitName) {
        //const service_url = EXTERNAL_API_URL + "?category=Fruit&item=" + req.params.fruitName;
        const service_url = "https://data.ct.gov/resource/y6p2-px98.json?category=Fruit&item=Peaches";
        //call Service with dependency injection, who in turn makes async call to NASA API.
        get(service_url, (res) => {
            res.on('data', (chunk) => {
                data.push(chunk);
                console.log('data in: ', data);
            });
            res.on('end', () => {
                console.log("end external request");
            });
        });
        console.log('******data out: ', data);
    } else {
        return res.status(500);
    }
    return res.status(200).send(data.toString());
}

module.exports = {
    getFarmsByFruitname,
    getFarms,
}