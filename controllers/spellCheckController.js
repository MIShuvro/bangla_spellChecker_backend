const fs = require('fs')
const path = require('path')

module.exports.spellCheck = async (req, res) => {

    dictionaryWords = ''

    const customDictionary = await fs.readFileSync(path.join(__dirname + '/bnCustomDictionray.txt'))
    const bnMain = await fs.readFileSync(path.join(__dirname + '/BengaliWordList_main.txt'))

    dictionaryWords = customDictionary.toString() + ' ' + bnMain.toString()

    const dictionaryWordlist = dictionaryWords.split('\n', bnMain.length)

    var dictionary = dictionaryWordlist;

    // console.log(dictionary)

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
        fs.appendFile(path.join(__dirname + '/bnCustomDictionray.txt'), "\n" + req.body.word.replace(/\n|\r/g, ""), (error) => {
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