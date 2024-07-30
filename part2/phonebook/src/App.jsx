import { useState } from 'react'

const Person = ({person}) => {
  return <p>{person.name}: {person.phone}</p>
}

const App = (params) => {
  const [persons, setPersons] = useState(params.persons)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
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
    } else {
      alert(`${newName} already exists...`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          phone #: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {return <Person key={person.id} person={person} />})}
    </div>
  )
}

export default App