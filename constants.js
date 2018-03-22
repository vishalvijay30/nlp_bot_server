/*
*   TODO: harcode for now, eventually need to find a way
*         to obtain values dynamically from AWS in the future
*/
module.exports = {
    num_questions: (input) => {
        if (input === "astronomy") {
            return 50;
        } else if (input === "biology") {
            return 310;
        } else if (input === "chemistry") {
            return 83;
        } else if (input === "earth science") {
            return 65;
        } else if (input === "energy") {
            return 72;
        } else if (input === "physics") {
            return 65;
        } else if (input === "middle school") {
            return 295;
        }
    }
};