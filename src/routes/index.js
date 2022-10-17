const { Router } = require('express');
const router = Router();
const fs = require('fs');
//const { v4: uuid } = require('uuid');

const json_books = fs.readFileSync('src/alternativas.json', 'utf-8');
let books = JSON.parse(json_books);

/*router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    });
});*/

router.get('/404-ERROR', (req, res) => {
    res.render('404.ejs');
})

router.get('/new-entry', (req, res) =>{
    res.render('new-entry');
});

router.post('/new-entry', (req, res) =>{
    const {categoria, tipo_Pregunta, dificultad, titulo, a, b, c, d, a2, b2, c2, d2} = req.body;
    if(!categoria || !tipo_Pregunta || !dificultad || !a || !b || !c || !d || !a2 || !b2 || !c2 || !d2){
        res.status(400).send('Entries must have a title and description');
        return;
    }
    let newBook = {
        categoria,
        tipo_Pregunta,
        dificultad,
        titulo,
        opciones:[
            {a, a2},
            {b, b2},
            {c, c2},
            {d, d2}
        ]
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