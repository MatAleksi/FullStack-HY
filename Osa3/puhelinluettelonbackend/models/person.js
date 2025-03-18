const mongoose = require ('mongoose')


mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url)
  .then(
    console.log('connected to MongoDB')
  )
  .catch(error => {
    console.log('error connecting to MongoDB' + error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters long'],
    required: true,
  },
  number: {
    type:String,
    minlength: [8, 'Number must be at least 8 characters long'],
    validate:{
      validator: function (number) {
        return /\d{2,3}-\d{1}/.test(number)
      },
      message: 'Number was not a valid phone number. The beginning of the number must be formatted either xx-xxxx..., or xxx-xxxx...'
    },
    required: true,
  }
})

personSchema.set('toJSON', {

  transform: (document, returnedObject) => {

    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)