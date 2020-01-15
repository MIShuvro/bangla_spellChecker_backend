const fs = require('fs')

module.exports.spellCheck = async (req, res) => {

    // // Get Dictionary
    // const data = await fs.readFileSync('E:/10MS/banglaSpellChecker/controllers/BengaliWordList_main.txt')
    const path = require('path')
    const file = await fs.readFileSync(path.join(__dirname + '/BengaliWordList_main.txt'))
    //E: /10MS/banglaSpellChecker / controllers
    const dictionaryWords = file.toString()
    const dictionaryWordlist = dictionaryWords.split(' ', file.length)
    var dictionary;
    dictionaryWordlist.map(data => {

        dictionary = data.split(/\r\n|\n|\r/)
    })

    const response = req.body.filter(element => dictionary.indexOf(element) == -1)

    var wrongword = [];
    for (i = 0; i < response.length; i++) {
        if (wrongword.indexOf(response[i]) === -1) {
            wrongword.push(response[i]);
        }
    }
    res.status(200).json({
        "code": 200,
        "status": "OK",
        "data": {
            wrongword
        }

    })
}
// {
//     "code": 200,
//     "status": "OK",
//     "message": "",
//     "data": []
// }