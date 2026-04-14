import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import ContactList from './components/ContactList'
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  
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
      if (window.confirm(`${newName} is already added to phonebook, do you want to update the number?`)) {
        const existingPerson = persons.find(person => person.name === newName);
        contactService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated number for ${newName}`, 'success')
          })
          .catch(error => {
            if (error.response && error.response.status === 400) {
              showNotification(error.response.data.error, 'error')
            } else {
              showNotification(
                `Information of ${existingPerson.name} has already been removed from server`,
                'error'
              )
              setPersons(persons.filter(person => person.id !== existingPerson.id))
            }
          })
      }
    } else {
      contactService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          showNotification(`Added ${newName}`, 'success')
        })
        .catch(error => {
          showNotification(error.response.data.error, 'error')
        
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
          showNotification(`Deleted ${persons.find(person => person.id === id)?.name}`, 'success')
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
      <Notification message={notification ? notification.message : null} 
      type={notification ? notification.type : null} />
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
