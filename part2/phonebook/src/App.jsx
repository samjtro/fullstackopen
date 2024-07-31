import { useState } from 'react'

const Person = ({person}) => {
  return <p>{person.name}: {person.phone}</p>
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

const App = (params) => {
  const [persons, setPersons] = useState(params.persons)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(params.persons)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value)
    setFilteredPersons(persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }
  const addName = (event) => {
    var t = false
    persons.forEach((p) => {
      if (p.name === newName) { t = true }
    })
    if (!t) {
      event.preventDefault()
      const name = {
        id: persons[persons.length-1].id + 1,
        name: newName,
        phone: newPhone
      }
      setPersons(persons.concat(name))
      setFilteredPersons(filteredPersons.concat(name).filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase())))
      setNewName('')
      setNewPhone('')
    } else {
      alert(`${newName} already exists...`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Add addName={addName} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Filter value={filterValue} func={handleFilterValueChange} />
      {filteredPersons.map((person) => {return <Person key={person.id} person={person} />})}
    </div>
  )
}

export default App