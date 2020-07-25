var express = require("express");
var router = express.Router();

const { Translate } = require("@google-cloud/translate").v2;
const translate = new Translate();

/* GET users listing. */
router.post("", async function (req, res, next) {
    const text = req.body.literal;
    const target = req.body.target;
    var translations;
    try {
        // Run request
        [translations] = await translate.translate(text, target);
        translations = Array.isArray(translations) ? translations : [translations];

    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    } finally {
        console.log(translations)
        res.json(translations);
    }

});

module.exports = router;
