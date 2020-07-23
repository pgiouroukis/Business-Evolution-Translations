var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:cap', async function(req, res, next) {

    const cap = req.params.cap;
    console.log(cap)
    var db = req.app.locals.db.db("beTranslations").collection("demoCollection");

    await db.find( {code: {$lt: parseInt(cap) } })
            .toArray(function (err, result) {
			    if (err) res.status(400).json("Error" + err);
                res.json(result);
		    });

});

module.exports = router;
