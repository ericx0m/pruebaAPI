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
    const {categoria, tipo_Pregunta, dificultad, titulo, a, b, c, d, a2, b2, c2, d2} = req.body;
    if(!categoria || !tipo_Pregunta || !dificultad || !a || !b || !c || !d || !a2 || !b2 || !c2 || !d2){
        res.status(400).send('Entries must have a title and description');
        return;
    }
    const _id = preguntas.length;

    var a3; var b3; var c3; var d3;

    if(a2 === "True"){a3 = Boolean(true);}else{a3 = Boolean(false)}
    if(b2 === "True"){b3 = Boolean(true);}else{b3 = Boolean(false)}
    if(c2 === "True"){c3 = Boolean(true);}else{c3 = Boolean(false)}
    if(d2 === "True"){d3 = Boolean(true);}else{d3 = Boolean(false)}

    let newBook = {
        _id,
        categoria,
        tipo_Pregunta,
        dificultad,
        titulo,
        opciones:[
            {textoRespuesta: a, isCorrect: a3},
            {textoRespuesta: b, isCorrect: b3},
            {textoRespuesta: c, isCorrect: c3},
            {textoRespuesta: d, isCorrect: d3}
        ]
    };
    books.push(newBook);

    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/alternativas.json', json_books, 'utf-8');

    res.redirect('http://localhost:3000/');
});

/*router.get('/delete/:_id', (req,res) =>{
    books = books.filter(book => book._id != req.params._id);
    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/alternativas.json', json_books, 'utf-8');
    res.redirect('/');
})*/

module.exports = router;