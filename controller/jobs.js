const fetch = require('node-fetch');
const env = require('../config/environment');
module.exports.jobPage = async function (req, res) {
    const response = await fetch(env.api_path);
    const jobsData = await response.json();
    return res.render('placementCell', {
        title: "Placement Cell",
        body : jobsData.jobs
    });
};
