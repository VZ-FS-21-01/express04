const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.set('view engine', 'ejs')
// Wenn wir mit Formularen arbeiten wollen brauchen wir weitere Middleware
app.use(express.json()) // Um die Daten in json Format umzuwandeln
app.use(express.urlencoded({ extended: true }))

let jsonData = []
console.log(fs.existsSync('./data.json'))
if (!fs.existsSync('./data.json')) {
    fs.writeFile('./data.json', "[]", 'utf8', (err) => {
        if (err) throw err
        console.log("Datei erstellt")
    })
} else {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) throw err
        jsonData = JSON.parse(data)
        console.log(jsonData)
    })
}




app.get('/', (req, res) => {
    res.render('index')
})
// müssen den Pfad und die Methode festlegen
// app.post('/PFAD)
app.post('/add', (req, res) => {
    // Die Daten tauchen nicht in der URL auf, sondern werden als Payload (Nutzlast / Nutzerdaten) übermittelt
    // Wenn wir die Middleware nicht gesetzt haben ist der body undefined
    console.log(req)
    console.log(req.body)
    // res.render('show', { data: req.body })

    jsonData.push({
        message: req.body.myText,
        tel: req.body.myNumber,
        rating: req.body.mySelect
    })
    // jsonData.push(req.body)

    fs.writeFile('./data.json', JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) throw err
    })
    res.redirect('/')
})
// Wir können auch die get /post / ... Methoden auf die selbe URL legen

app.get('/all', (req, res) => {
    res.render('all', { jsonData })
})


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))