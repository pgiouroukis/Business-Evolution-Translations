var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/:langCode", async function (req, res, next) {
    
    const langCode = String(req.params.langCode);

	var db = req.app.locals.db.db("beTranslations").collection("demoCollection");

	await db
		.find({ code: { $exists: true } })
		.sort({ code: 1 })
		.toArray(function (err, result) {
			if (err) res.status(400).json("Error" + err);
            var finalResult = []
            for (var i = 0; i < result.length;  i++)
                if (result[i][langCode]!==undefined)
                    finalResult.push(result[i])
            res.json(finalResult);
		});
});

module.exports = router;
