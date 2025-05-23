const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://mattilaaleksi:${password}@fullstackpuhelinluettel.vjssdpm.mongodb.net/?retryWrites=true&w=majority&appName=Fullstackpuhelinluettelo`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3){
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}
if (process.argv.length>3){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(
    console.log('number saved!'),
    mongoose.connection.close()
  )
}