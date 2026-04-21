const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [3, 'Username must be at least 3 characters long!'],
    required: [true, 'Username is required!'],
    unique: true
  },
  
  name: String,

  passwordHash: {
    type: String,
    minlength: [3, 'Password must be at least 3 characters long!'],
    required: [true, 'Password hash is required!']
  },  

    blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
})
const User = mongoose.model('User', userSchema);

module.exports = User;