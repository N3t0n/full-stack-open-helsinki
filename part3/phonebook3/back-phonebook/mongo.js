const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://n3t0n:${password}@cluster0.fu0m8w1.mongodb.net/personApp?appName=Cluster0`
    
mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)




if (process.argv.length === 3) {
    findPerson()
} else if (process.argv.length === 5) {
    savePerson()
} else {
    console.log('Invalid number of arguments')
    mongoose.connection.close()
}

function findPerson() {
    Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
    console.log(`${person.name} - ${person.number}`)
    })
    mongoose.connection.close()
})
}

function savePerson() {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}

