const {
    scheduleNewLaunch,
    getAllLaunches 
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || 
        !launch.rocket ||
        !launch.target ||
        !launch.launchDate
    ) {
        return res.status(400).json({
            error: 'Missing required launch properties'
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid Launch Data'
        });
    }
    await scheduleNewLaunch(launch);

    return res.status(201).json(launch);
}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}