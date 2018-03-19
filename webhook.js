//local imports
const utils = require('./utils');

module.exports = {
    fulfill: (req, res) => {
        //figure out where in the conversation you are
        let action = req.body.result.action;
        let contexts = req.body.contexts; //array with multiple values
        let id;

        if (action === 'setup') {
            console.log("setup invoked from webhook");

            let inputs = req.body.result.parameters;
            console.log("reached with params", inputs);

            let level = inputs.level;
            let subject = inputs.subject;

            //required params, followup handled on Dialogflow; no work for webhook
            if (!level || !subject) { return; }

            //get a question from db
            let db_data = utils.choose_question(level, subject);
            id = db_data.id;

            utils.send_dialogflow_response(db_data.question, db_data.question, res);
        }
    }
}