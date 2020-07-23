var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/:code/:language", async function (req, res, next) {
    const code = req.params.code;
    const language = req.params.language;
    const literal = req.body.literal;

	console.log(code);
	var db = req.app.locals.db.db("beTranslations").collection("demoCollection");

	await db
		.updateOne(
            { code: {$eq:parseInt(code)} },
            { $set: { [language]: String(literal)  } },
            function(err, result) {
    			if (err) res.status(400).json("Error" + err);
			    res.json(result);
            }
        )
});

module.exports = router;
