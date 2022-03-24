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

router.put('/:id', (req,res) => {
    let id = req.params.id;
    console.log(( 'inside put router', id));

    const queryText =`
        UPDATE "cart" SET "purchased" = NOT "purchased"
        WHERE "id" = $1;
    `;
    const values = [id];
    pool.query( queryText, values )
    .then( result => {
        res.sendStatus(200)
    }). catch (err => {
        console.log( err);
        res.sendStatus(500)
    })
});



module.exports = router;