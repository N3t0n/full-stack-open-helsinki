import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import ContactList from './components/ContactList'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

 useEffect(() => {
  contactService
    .getAll()
    .then(response => {
      setPersons(response.data);
    });
 }, []);

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const nameExists = persons.some((person => person.name === newName))
    if (nameExists) {
      alert(`${newName} is already added to phonebook!`);
    } else {
      contactService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      console.log(`Deleting person with id ${id}`);
      contactService
        .deleteContact(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
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
      
      <ContactList 
      namesToShow={namesToShow}
      deletePerson={deletePerson}
       />

    </div>
  )
}

export default App
