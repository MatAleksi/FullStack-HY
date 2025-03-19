
import React, { useState, useEffect } from 'react'
import numberService from './services/numbers'


const Display = ({ book, filter, remover }) => {
    return (
        <div>
            {
                book.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(filteredName => (
                    <ul key={filteredName.id} >
                        <Person name={filteredName.name} number={filteredName.number} id={filteredName.id} clickHandler={remover} />
                    </ul>
                ))}
        </div>
    )
}

const Person = (props) => {
    return (
        <div>{props.name} {props.number} <button onClick={() => props.clickHandler(props.id, props.name)}>delete</button></div>
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

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="alert">
            {message}
        </div>
    )
}

const Error = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filtered, setNewFilter] = useState('')
    const [alert, setAlert] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
      
    }, [persons])
    if(persons.length === 0){
        numberService
            .getAll()
            .then(initialNumbers => {
                setPersons(initialNumbers)
        })
    }

    const addName = (event) => {
        console.log(persons)
        event.preventDefault()
        const sameName = persons.find(person => (person.name === newName))
        var errorCheck = false
        if (persons.find(person => person.name === newName) !== undefined) {
            if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
                const nameObject = {
                    name: newName,
                    number: newNumber,
                    id: sameName.id,
                }
                numberService
                    .update(nameObject.id, nameObject)
                    .then(returned => {
                        setPersons(persons.map(person => person.id !== nameObject.id ? person : returned))
                    })
                    .catch(error => {
                        errorCheck = true
                        console.log(error.response)
                        setError(error.response.data.error.toString())
                        setTimeout(() => {
                            setError(null)
                        }, 5000)
                    })
                if (errorCheck) {
                    setAlert(`Changed the number of ${newName}`)
                    setTimeout(() => {
                        setAlert(null)
                    }, 5000)
                }
            }
        
        } else {
            const nameObject = {
                name: newName,
                number: newNumber,
                
            }
            numberService
                .create(nameObject)
                .then(returnedNumber => {
                    setPersons(persons.concat(returnedNumber))
                })
                .catch(error => {
                    errorCheck = true
                    console.log(error.response)
                    setError(error.response.data.error.toString())
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                    
                })
            if(errorCheck){    
                setAlert(`Added  ${newName}`)
                console.log('hiphei')
                setTimeout(() => {
                    setAlert(null)
                }, 5000)
            }
            setNewNumber('')
            setNewName('')
        }
        setTimeout(() => {
            numberService
                .getAll()
                .then(names =>{
                    console.log(names)
                    setPersons(names)
                })
        }, 500)
        console.log(persons)
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

    const clickHandler = (id, name) => {
        if (window.confirm(`Delete ${name}`)) {
            console.log(id)
            numberService
                .del(id)
            
            numberService
                .getAll()
                .then(names => {
                    setPersons(names.filter(nameId =>
                        nameId.id !== id))
                })
            setAlert(`Deleted  ${name}`)
            setTimeout(() => {
                setAlert(null)
            }, 5000)
            
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={alert} />
            <Error message={error} />
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
            <Display book={persons} filter={filtered} remover={clickHandler} />
        </div>
    )
}

export default App