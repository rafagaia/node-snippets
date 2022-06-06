//One Model can be required in many Controllers, and One Controller can require many Models.
const { getAllPlanets } = require('../../models/planets.model');

function httpGetAllPlanets(req, res) {
    return res.status(200).json(getAllPlanets());
}


module.exports = {
    httpGetAllPlanets,
}