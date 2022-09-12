const { Router } = require('express');
const router = Router();
const fs = require('fs');
//const { v4: uuid } = require('uuid');

const json_books = fs.readFileSync('src/alternativas.json', 'utf-8');
let books = JSON.parse(json_books);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    });
});

router.get('/404-ERROR', (req, res) => {
    res.render('404.ejs');
})

router.get('/new-entry', (req, res) =>{
    res.render('new-entry');
});

router.post('/new-entry', (req, res) =>{
    const _id = books.length + 1;
    const {categoria, tipo_Pregunta, dificultad, pregunta, a, b, c, d ,  respuesta} = req.body;
    if(!categoria || !tipo_Pregunta || !dificultad || !a || !b || !c || !d || !respuesta){
        res.status(400).send('Entries must have a title and description');
        return;
    }
    let newBook = {
        _id,
        categoria,
        tipo_Pregunta,
        dificultad,
        pregunta,
        Alternativas:[
            a,
            b,
            c,
            d
        ],
        respuesta
    };
    books.push(newBook);

    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/alternativas.json', json_books, 'utf-8');

    res.redirect('/');
});

router.get('/delete/:_id', (req,res) =>{
    books = books.filter(book => book._id != req.params._id);
    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/alternativas.json', json_books, 'utf-8');
    res.redirect('/');
})

module.exports = router;