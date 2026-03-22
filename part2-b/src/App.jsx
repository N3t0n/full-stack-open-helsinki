import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import ContactList from './components/ContactList'

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
      <Filter value={newFilter} onChange={handleNewFilter} />
      <h2>Add a new contact</h2>
      <Form
        onSubmit={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      
      <ContactList namesToShow={namesToShow} />

    </div>
  )
}

export default App
