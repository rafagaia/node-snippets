//One Model can be required in many Controllers, and One Controller can require many Models.
const { planets } = require('../../models/planets.model');

function getAllPlanets(req, res) {
    return res.status(200).json(planets);
}


module.exports = {
    getAllPlanets,
}