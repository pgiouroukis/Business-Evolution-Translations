var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/:langCode/:amount/:page", async function (req, res, next) {
    const langCode = String(req.params.langCode);
    const amount = parseInt(req.params.amount);
	const page = parseInt(req.params.page);

	var db = req.app.locals.db.db("beTranslations").collection("demoCollection");

	await db
		.find()
		.sort({ code: 1 })
		.toArray(function (err, result) {
            if (err) res.status(400).json(err);
            var newResult = []; //array that will contain every record that has a langCode field
            var finalResult = []
            for (var i=0; i<result.length; i++) 
                if (result[i][langCode]!==undefined)
                    newResult.push(result[i]);
            
            for (var i=amount*(page-1); i<amount*page; i++) {
                if (i<newResult.length) finalResult.push(newResult[i])
            }
            
            res.json(finalResult)
            
		});
});

module.exports = router;
