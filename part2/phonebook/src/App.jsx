import { useState } from 'react'

const Person = ({person}) => {
  return <p>{person.name}</p>
}

const App = (params) => {
  const [persons, setPersons] = useState(params.persons)
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => setNewName(event.target.value)
  const addName = (event) => {
    event.preventDefault()
    const name = {
      id: persons[persons.length-1].id + 1,
      name: newName
    }
    setPersons(persons.concat(name))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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