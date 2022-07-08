import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'
import NotificationBox from './components/NotificationBox'


const Filter = ({filter, updateFilter}) => {
  return (
  <div>
    Filter: <input value = {filter} onChange={updateFilter}></input>
  </div>
  )
}

const Form = ({addNewPerson, newName, updateNewName, newNumber, updateNewNumber}) => {
  return (
    <form onSubmit={addNewPerson}>
    <div>
      name: <input value={newName} onChange={updateNewName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={updateNewNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons, handleDelete}) => {
  return (
    <ul>
      {persons && persons.map(p => 
        <li key={p.id}>
          {p.name} {p.number}
          <button onClick={() => {
            if (window.confirm(`Delete ${p.name} ?`)) {
              return handleDelete(p.id)
            }
          }}>delete</button>
        </li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const updateNewName = (event) => setNewName(event.target.value)
  const updateNewNumber = (event) => setNewNumber(event.target.value)
  const updateFilter = (event) => setFilter(event.target.value)


  const fetchPersons = () => {
    personService.getPersons().then(allPersons => {
      console.log(allPersons)
      setPersons(allPersons)
    }
    )
  }

  const deletePerson = (id) => {
    personService
      .deletePerson(id).then(deletedPerson => {
        console.log(deletedPerson)  
      })
        
    const updatedPersons = persons.filter(p => p.id !== id)
    setPersons(updatedPersons)
      
  }

  useEffect(fetchPersons, [])



  const addNewPerson = (event) => {
    event.preventDefault()
    const personExists = persons.map(person => person.name).indexOf(newName)

    console.log(`Person ${newName} ${personExists !== -1 ? "already exists" : "doesn't exist"}`)
    if (personExists !== -1) {
      if (window.confirm(`Person ${newName} is already added to the phonebook, replace the old number?`)) {
        const oldPerson = persons.find(p => p.name === newName)
        const newPerson = {
          ...oldPerson,
          number: newNumber
        }
        personService.updatePerson(newPerson)
          .then(updatedPerson => {
            console.log("Updated person", updatedPerson)
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
          })
          .catch(error => {
            displayNotification(`Person ${newPerson.name} was already deleted`, 5000, false)
            setPersons(persons.filter(p => p.id !== newPerson.id))
          })

        displayNotification(`Updated person ${newPerson.name}`, 5000, true)
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
  
      personService.addPerson(newPerson)
        .then(addedPerson => {
          console.log("Added person", addedPerson)
          setPersons(persons.concat(addedPerson))
        })
      
      displayNotification(`Added person ${newPerson.name}`, 5000, true)
    }
    setNewName('')
    setNewNumber('')
  }

  const displayNotification = (message, timeout, successful) => {
    console.log(message)
    let msgObject= {
      message: message,
      successful: successful
    }
    setNotification(msgObject)
    setTimeout(() => {
      setNotification(null)
    }, timeout)
  }

  const personsToShow = filter 
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <NotificationBox notification={notification}/>
      <Filter filter={filter} updateFilter={updateFilter}/>
      <h2>Add New</h2>
      <Form addNewPerson={addNewPerson} updateNewName={updateNewName} newName={newName} updateNewNumber={updateNewNumber} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={deletePerson}/>
    </div>
  )
}

export default App