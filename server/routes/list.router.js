const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// TODO - Add routes here...

// GET route - gets entire list from DB
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

// DELETE route - removes item from DB
router.delete('/:id', (req, res) => {
    const itemToDelete = req.params.id;
    const queryText = `
        DELETE FROM "cart"
        WHERE "id" = $1;
    `;

    pool.query(queryText, [itemToDelete])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        });
});

//POST ROUTE - puts item into DB 
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

// DELETE route - Clears all items from DB
router.delete('/clear', (req, res) => {
    const queryText = `
        DELETE FROM "cart"
    `;

    pool.query(queryText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        });
});

// PUT route - Resets all items to FALSE from DB
router.put('/reset', (req, res) => {
    const queryText = `
        UPDATE "cart"
        SET "purchased" = FALSE;
    `;

    pool.query(queryText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        });
});

module.exports = router;