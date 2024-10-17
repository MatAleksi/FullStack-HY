require('dotenv').config()

const http = require('http')
const express = require('express')
var morgan = require('morgan')
const { response } = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log('Server running on port ', PORT)
})
app.use(express.json()) 
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
morgan.token("content", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " ";
});


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons=>{
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person=>{
        response.json(person)
    })
})

app.get('/info', (req, res) => {
    const resp1 = 'Phonebook has info for ' + persons.length +' people'
    const resp2 = new Date().toString() 
    res.send('<div>' + resp1 + '</div>' + '<div>' + resp2 + '</div>')
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if(body.name === undefined){
        return response.status(400).json({error: 'content misisng' })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson =>{
        response.json(savedPerson)
    })
})

