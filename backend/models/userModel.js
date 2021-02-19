import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBuyer: {
      type: Boolean,
      required: true,
      default: false,
    },
    socialMedia1: {
      type: String,
      required: true,
    },
    socialMedia2: {
      type: String,
      required: false,
    },
    socialMedia3: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    // reviews: [reviewSchema],
    // rating: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
    // numReviews: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
