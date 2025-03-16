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
        const listAndIds = []
        persons.forEach(person => {
            console.log(person._id)
            listAndIds.push({
                name: person.name,
                number: person.number,
                id: person._id.toString()
            })            
        })
        console.log(listAndIds)
        response.json(listAndIds)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(result=>{
        console.log(result)
        const reply = {
            name: result.name,
            number: result.number,
            id: request.params.id
        }
        response.json(reply)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
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
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result =>{
        response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body
    let names = []
    console.log(body)
    if(body.name === undefined || body.name === ""){
        return response.status(400).json({error: 'content misisng' })
    }
    if(body.number ===undefined || body.number === ""){
        return response.status(400).json({error: 'content missing'})
    }
    Person.find({}).then(persons=>{
        persons.forEach(person=>{
            names.push(person.name)
        })
        if(names.includes(body.name)){
        
            return response.status(409).json({error: 'name must be unique'})
        }else{
            const newperson = new Person({
                name: body.name,
                number: body.number
                //id: (Math.random()*100000000).toString()
            })
            newperson.save().then(savedPerson =>{
                response.json(savedPerson)
            })
        }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) =>{
    const body = request.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
              } else {
                response.status(404).end()
              }
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) =>{
        console.log(error.message)
        next(error)
}
app.use(errorHandler)