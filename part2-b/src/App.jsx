import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1, number: 178349085 },
    { name: 'Ada', id: 2, number: 123456789 },
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

 
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }
    const nameExists = persons.some((person => person.name === newName))
    if (nameExists) {
      alert(`${newName} is already added to phonebook!`);
    } else {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }

  }




  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  
  const namesToShow = newFilter 
    ? persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons;
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleNewFilter}/>
      </div>
      <h2>Add a new contact</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {namesToShow.map((person) => (
          <li key={person.id}>{person.name} - {person.number}</li>
        ))}
      </ul>


    </div>
  )
}

export default App