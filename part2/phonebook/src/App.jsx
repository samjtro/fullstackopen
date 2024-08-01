import { useState, useEffect } from 'react'
import db from './services/db'

const Person = ({person, deletePerson}) => {
  return (
    <>
      <p>{person.name}: {person.phone}</p>
      <button onClick={deletePerson}>delete</button>
    </>
  )
}

const Filter = (params) => {
  return (
    <form>
      <div>
        filter: <input value={params.value} onChange={params.func} />
      </div>
    </form>
  )
}

const Add = (params) => {
  return (
    <form onSubmit={params.addName}>
      <div>
        name: <input value={params.newName} onChange={params.handleNameChange}/>
      </div>
      <div>
        phone #: <input value={params.newPhone} onChange={params.handlePhoneChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Phonebook = (params) => {
  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={params.filterValue} func={params.handleFilterValueChange} />
      {params.filteredPersons.map((person) => {return <Person key={person.id} person={person} deletePerson={params.deletePerson} />})}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  useEffect(() => {
    db
      .getAll()
      .then(response => {
        setPersons(response)
        setFilteredPersons(response)
      })
  }, [])
  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  const addName = (event) => {
    var t = false
    persons.forEach((p) => {
      if (p.name === newName) { t = true }
    })
    if (!t) {
      event.preventDefault()
      const name = {
        id: Number(persons[persons.length-1].id) + 1,
        name: newName,
        phone: newPhone
      }
      db
        .create(name)
        .then(response => {
          setPersons(persons.concat(response))
          setFilteredPersons(filteredPersons.concat(response).filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())))
        })
      setNewName('')
      setNewPhone('')
    } else {
      alert(`${newName} already exists...`)
    }
  }
  const deletePerson = ({name}) => {
    if (window.confirm(`delete`))
    db
      .deleteItem()
  }

  return (
    <div>
      <Add addName={addName} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <Phonebook filterValue={filterValue} handleFilterValueChange={handleFilterValueChange} filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App