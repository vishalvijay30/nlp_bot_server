module.exports = {
    process: (req, res) => {
        const timePeriod = req.body.result.parameters.period;
        // const state;
        // const agenda;
        // if (req.body.result.parameters.geo-state-us !== '') {
        //     state = req.body.result.parameters.geo-state-us;
        // }

        // if (req.body.result.parameters.policy-agenda !== '') {
        //     agenda = req.body.result.parameters.geo-state-us;
        // }

        if (timePeriod.substring(0, 4) === '1920') {
            let fulfillment = {};
            fulfillment.speech = "What genre of music became incredibly popular during the 1920s?";
            fulfillment.displayText = "What genre of music became incredibly popular during the 1920s?";
            res.json(fulfillment);
        }
    }
}