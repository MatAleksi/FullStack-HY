const http = require('http')
const express = require('express')
const morgan = require('morgan')
const { response } = require('express')
const app = express()
app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
morgan.token("content", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " ";
});


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
}) 
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(person)
})

app.get('/info', (req, res) => {
    const resp1 = 'Phonebook has info for ' + persons.length +' people'
    const resp2 = new Date().toString() 
    res.send('<div>' + resp1 + '</div>' + '<div>' + resp2 + '</div>')
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.filter(person => person.id !== id)
    response.status(204).end()
})



const generateId = () => {
    const id = Math.floor(Math.random() * 1000000)
    return id
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name){
        return response.status(400).json({
            error: 'name is missing'
        })
    }    
    if(!body.number){
        return response.status(400).json({
            error: 'number is missing'
        })
    } 
    let names = persons.map(a => a.name)
    if(names.includes(body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
