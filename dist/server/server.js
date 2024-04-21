import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
// import fs from 'fs';
// import { readCards } from './utils/readCards.js';
import { readCards } from './utils/readCards.js';
import { writeCard } from './utils/writeCard.js';
import { deleteCard } from './utils/deleteCard.js';
import { updateCard } from './utils/updateCard.js';
import { readCard } from './utils/readCard.js';
const app = express();
const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../../public');
app.use(express.static(__dirname));
app.use(express.json());
app.get('/cards/', (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    const folderPath = join(__dirname, 'cards', name);
    if (!id) { // List the cards
        readCards(folderPath, (err, response) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(response);
            }
        });
    }
    else { // Show one cards
        readCard(folderPath, parseInt(id), (err, response) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send(response);
            }
        });
    }
});
app.post('/cards/', (req, res) => {
    const name = req.query.name;
    console.log(name);
    const folderPath = join(__dirname, 'cards', name);
    const cardData = req.body;
    writeCard(folderPath, cardData, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(response);
        }
    });
});
app.delete('/cards/', (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    const folderPath = join(__dirname, 'cards', name);
    deleteCard(folderPath, parseInt(id), (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(response);
        }
    });
});
app.patch('/cards/', (req, res) => {
    const name = req.query.name;
    const folderPath = join(__dirname, 'cards', name);
    const cardData = req.body;
    updateCard(folderPath, cardData, (err, response) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(response);
        }
    });
});
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
