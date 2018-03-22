//npm imports
const AWS = require('aws-sdk');

//local imports
const consts =  require('./constants');

//aws config
AWS.config.update({ 'region': 'us-east-2' });

module.exports = {
    choose_question: (level, subject) => {
        let table;
        let id;
        if (level === "middle school") {
            table = "ms_questions";
            id = Math.floor(Math.random() * consts.num_questions(level));
        } else if (level === "high school") {
            table = "hs_" + subject;
            id = Math.floor(Math.random() * consts.num_questions(subject));
        }
        params = {
            Key: {
                "id": {
                    N: id.toString()
                }
            },
            TableName: table
        }
        const dynamodb = new AWS.DynamoDB();
        return new Promise((resolve, reject) => {
            dynamodb.getItem(params, (err, item) => {
                if (err) {
                    console.log("dynamodb query errors", err);
                    reject(err);
                } else {
                    console.log("dynamodb query item", item);
                    let res = {};
                    res.question = item.Item.question.S;
                    res.answer = item.Item.answer.S;
                    res.id = item.Item.id.N;
                    resolve(res);
                }
            });
        });
    },

    check_answer: (user_answer, original_answer) => {
        console.log("user_answer", user_answer);
        console.log("original_answer", original_answer);
        return user_answer.includes(original_answer);
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