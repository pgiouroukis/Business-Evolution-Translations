var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:amount/:batch', async function(req, res, next) {

    const amount = parseInt(req.params.amount);
    const batch = parseInt(req.params.batch);

    var db = req.app.locals.db.db("beTranslations").collection("demoCollection");

    await db
			.find({ code: { $gt: amount * (batch - 1), $lte: amount * batch } })
			.sort({ code: 1 })
			.toArray(function (err, result) {
				if (err) res.status(400).json("Error" + err);
				res.json(result);
			});

});

module.exports = router;
