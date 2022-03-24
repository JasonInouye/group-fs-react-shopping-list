const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...

router.get('/', (req, res) => {
    const queryText = `
        SELECT * FROM "cart"
        ORDER BY UPPER ("item");
    `;

    pool.query(queryText)
        .then((result)=> {
            res.send(result.rows);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});



module.exports = router;