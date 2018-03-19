//local imports
const utils = require('./utils');

module.exports = {
    fulfill: (req, res) => {
        //figure out where in the conversation you are
        let action = req.body.result.action;
        let contexts = req.body.contexts; //array with multiple values
        let id;
        let question;
        let answer;

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
            question = db_data.question;
            answer = db_data.answer;

            utils.send_dialogflow_response(question, question, res);
        } else if (action === 'reg_op') {
            console.log("regular operation invoked");
            //get a question from db
            let db_data = utils.choose_question(level, subject);
            id = db_data.id;
            question = db_data.question;
            answer = db_data.answer;

            utils.send_dialogflow_response(question, question, res);
        } else if (action === 'check_answer') {
            console.log("check answer invoked");
            let user_answer = req.body.result.answer;

            let correct = utils.check_answer(user_answer, answer);

            if (correct) {
                utils.send_dialogflow_response("That's correct! Would you like to continue?", "That's correct! Would you like to continue?", res);
            } else {
                utils.send_dialogflow_response("Oh no, that's incorrect. Would you like to continue?", "Oh no, that's incorrect. Would you like to continue?", res);
            }
        }
    }
}