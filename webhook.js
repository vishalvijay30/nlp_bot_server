//npm imports
const AWS = require('aws-sdk');

//local imports
const consts =  require('./constants');

//aws config
AWS.config.update({ region: 'us-east-2' });

module.exports = {
    fulfill: (req, res) => {
        //figure out where in the conversation you are
        let action = req.body.result.action;
        let id;
        if (action === 'setup') {
            console.log("setup invoked from webhook");

            let inputs = req.body.result.parameters;
            console.log("reached with params", inputs);

            let level = inputs.level;
            let subject = inputs.subject;
            id = Math.floor(Math.random() * consts.NUM_MS_QUESTIONS);
            params = {
                Key: {
                    "id": {
                        N: id.toString()
                    }
                },
                TableName: "ms_questions"
            }
            const dynamodb = new AWS.DynamoDB();
            dynamodb.getItem(params, (err, data) => {
                if (err) {
                    console.log("dynamodb query errors", err);
                } else {
                    console.log("dynamodb query data", data);
                    res.json({ "data": data });
                }
            });
        }
    }
}