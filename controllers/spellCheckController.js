const fs = require('fs')

module.exports.spellCheck = async (req, res) => {

    const path = require('path')
    const file = await fs.readFileSync(path.join(__dirname + '/BengaliWordList_main.txt'))
    const dictionaryWords = file.toString()
    const dictionaryWordlist = dictionaryWords.split(' ', file.length)
    var dictionary;
    dictionaryWordlist.map(data => {

        dictionary = data.split(/\r\n|\n|\r/)
    })

    const response = req.body.filter(element => dictionary.indexOf(element) == -1)

    var words = [];
    for (i = 0; i < response.length; i++) {
        if (words.indexOf(response[i]) === -1) {
            words.push(response[i]);
        }
    }
    res.status(200).json({
        "code": 200,
        "status": "OK",
        "data": {
            words
        }

    })
}

module.exports.addToDictonary = (req, res) => {
    const path = require('path')
    if (req.body.word && req.body.word.length > 0) {
        fs.appendFile(path.join(__dirname + '/addNewWord.txt'), "\n" + req.body.word.replace(/\n|\r/g, ""), (error) => {
            if (error) {
                res.status(500).json({
                    "code": 500,
                    "status": "Internal Server Error",
                    "message": "The request was not completed due to an internal error on the server side.",
                    "data": {
                        word: req.body.word
                    }

                })
            } else {
                res.status(201).json({
                    "code": 201,
                    "status": "OK",
                    "message": "Successfully Added",
                    "data": {
                        word: req.body.word
                    }

                })
            }
        })
    } else {
        res.status(404).json({
            "code": 404,
            "status": "Not Found",
            "message": "The requested resource was not found.",
            "data": {
                word: req.body.word
            }

        })
    }
}

// {
//     "code": 200,
//     "status": "OK",
//     "message": "",
//     "data": []
// }