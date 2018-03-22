//local imports
const utils = require('./utils');
const consts = require('./constants');

let level;
let subject;
let db_data = {};

module.exports = {
    fulfill: (req, res) => {
        //figure out where in the conversation you are
        let action = req.body.result.action;
        let contexts = req.body.contexts; //array with multiple values

        if (action === 'setup') {
            console.log("setup invoked from webhook");

            let inputs = req.body.result.parameters;
            console.log("reached with params", inputs);

            level = inputs.level;
            subject = inputs.subject;

            //required params, followup handled on Dialogflow; no work for webhook
            if (!level || !subject) { return; }

            //get a question from db
            utils.choose_question(level, subject).then(data => {
                db_data = data;
                utils.send_dialogflow_response(db_data.question, db_data.question, null, res);
            });

        } else if (action === 'reg_op') {
            console.log("regular operation invoked");
            //get a question from db
            utils.choose_question(level, subject).then(data => {
                db_data = data;
                utils.send_dialogflow_response(db_data.question, db_data.question, null, res);
            });
        } else if (action === 'check_answer') {
            console.log("check answer invoked");
            let user_answer = req.body.result.resolvedQuery;

            let correct = utils.check_answer(user_answer, db_data.answer);

            if (correct) {
                utils.send_dialogflow_response("That's correct! Would you like to continue?", "That's correct! Would you like to continue?", null, res);
            } else {
                utils.send_dialogflow_response("Oh no, that's incorrect. Would you like to continue?", "Oh no, that's incorrect. Would you like to continue?", null, res);
            }
        }
    }
}