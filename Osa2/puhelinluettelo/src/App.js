import React, { useState } from 'react'

const Display = ({ book, filter }) => {
    
    return (
        <div>
            {
                book.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(filteredName => (
                <ul key={filteredName.id} >
                        <Person name={filteredName.name} number={filteredName.number}/>
                </ul>
        ))}
        </div>
    )
}

const Person = (props) => {
    return (
        <p>{props.name} {props.number}</p>
        )
}

const Filter = ({ filtered, filter }) => {
    return (
        <form>
            <div>
                filter shown with <input value={filtered} onChange={filter} />
            </div>
        </form>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filtered, setNewFilter] = useState('')

    const addName = (event) => {
            event.preventDefault()

            if (persons.find(person => person.name === newName) !== undefined) {
                window.alert(`${newName} is already added to phonebook`)
            } else {
                const nameObject = {
                    name: newName,
                    number: newNumber,
                    id: persons.length + 1,
                }
                setPersons(persons.concat(nameObject))
                setNewNumber('')
                setNewName('')
        }
        
    }
    
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    const filter = (event) => {
        setNewFilter(event.target.value)
    }  

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter filtered={filtered} filter={filter} />

            <h2>add a new</h2>

            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Display book={persons} filter={filtered} />
        </div>
    )
}

export default App
