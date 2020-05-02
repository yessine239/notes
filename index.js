const express = require('express')
const bodyParser = require('body-parser')
const dateFormat = require('dateformat')
const { uuid } = require('uuidv4')
var session = require('express-session');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

var notes = []

app.route('/')
    .get((req, res) => {
        res.render('index', { notes: notes })
    })
    .post((req, res) => {
        var now = dateFormat(new Date(), 'dddd, mmmm dS, yyyy\nh:MM:ss TT')
        var id = uuid()
        var newNote = {
            id: id,
            title: req.body.title,
            content: req.body.content,
            date: now
        }
        notes.push(newNote)
        res.redirect('/')
    })

app.post('/delete', (req, res) => {
    notes = notes.filter(note => note.id !== req.body.noteToDeleteId)
    res.redirect('/')
})

app.listen(3000, () => console.log('Listening on port 3000'))