const ContactList = ({ namesToShow, deletePerson }) => {
  return (
    <ul>
      {namesToShow.map((person) => (
  
          <li key={person.id}>{person.name} - {person.number} - - -
          <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
      
      ))}
    </ul>
  )
}

export default ContactList
