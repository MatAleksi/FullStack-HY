require('dotenv').config()

const http = require('http')
const express = require('express')
var morgan = require('morgan')
const { response } = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const { errorMonitor } = require('stream')

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
    Person.find({}).then(person=>{
        const id = request.params.id
        console.log(id)
        console.log(person.length)
        if(id>=person.length){
            return response.status(404).end()
        }
        response.json(person[id])
    })
})

app.get('/info', (request, response) => {
    let amount = 0
    Person.find({}).then(persons=>{
        persons.forEach(person=>{
            amount+=1
            console.log(amount)
        })            
        const resp1 = 'Phonebook has info for ' + amount +' people'
        const resp2 = new Date().toString() 
        response.send('<div>' + resp1 + '</div>' + '<div>' + resp2 + '</div>')
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.find({}).then(person=>{
        const id = request.params.id
        console.log(id)
        console.log(person[id])
        if(id>=person.length){
            return response.status(404).end()
        }
        Person.deleteOne(person[id])
        response.status(204).end()
    })
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if(body.name === undefined || body.name === ""){
        return response.status(400).json({error: 'content misisng' })
    }
    if(body.number ===undefined || body.number === ""){
        return response.status(400).json({error: 'content missing'})
    }
    Person.find({}).then(persons=>{
        persons.forEach(person=>{
            if(person.name === body.name){
                return response.status(409).json({error: 'name must be unique'})
            }
        })
    })
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson =>{
        response.json(savedPerson)
    })
})

