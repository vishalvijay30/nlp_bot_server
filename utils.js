//npm imports
const AWS = require('aws-sdk');

//local imports
const consts =  require('./constants');

//aws config
AWS.config.update({ 'region': 'us-east-2' });

module.exports = {
    choose_question: (level, subject) => {
        let id = Math.floor(Math.random() * consts.NUM_MS_QUESTIONS);
        params = {
            Key: {
                "id": {
                    N: id.toString()
                }
            },
            TableName: "ms_questions"
        }
        const dynamodb = new AWS.DynamoDB();
        dynamodb.getItem(params, (err, item) => {
            if (err) {
                console.log("dynamodb query errors", err);
            } else {
                console.log("dynamodb query item", item);
                let res = {};
                res.question = item.question.S;
                res.answer = item.answer.S;
                res.id = id;
                return res;
            }
        });
    },

    check_answer: (id, user_answer, original_answer) => {
        return user_answer === original_answer;
    },

    send_dialogflow_response: (speech, display_text, follow_up_event, res) => {
        let webhook_res = {};
        webhook_res.speech = speech;
        webhook_res.displayText = display_text;
        if (follow_up_event) {
            let event = {};
            event.name = follow_up_event;
            webhook_res.followUpEvent = event;
        }
        res.json(webhook_res);
    }
}