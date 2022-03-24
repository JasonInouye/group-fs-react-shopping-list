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

router.post('/', (req,res) =>{
    let newItem = req.body;

    let queryText = `
        INSERT INTO "cart" ("item", "quantity", "unit")
        VALUES ($1, $2, $3);`

    let values = [newItem.item, newItem.quantity, newItem.unit];

    pool.query(queryText, values)
    .then((result) => {
        console.log('Added new Item', newItem);
        res.sendStatus(201);
    }).catch (err => {
        console.log('Error in PUT', err);
        res.sendStatus(500);
    })
})


module.exports = router;