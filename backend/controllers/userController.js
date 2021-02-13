import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import speakeasy from 'speakeasy'
import User from '../models/userModel.js'

//? @desk     Auth user & get token
//? @rout     Post /api/users/login
//? @access   Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      login: user.login,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      isBuyer: user.isBuyer,
      socialMedia1: user.socialMedia1,
      socialMedia2: user.socialMedia2,
      socialMedia3: user.socialMedia3,
      description: user.description,
      experience: user.experience,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//? @desk     Register a new user
//? @rout     Post /api/users
//? @access   Public

const registerUser = asyncHandler(async (req, res) => {
  const {
    login,
    name,
    email,
    password,
    socialMedia1,
    socialMedia2,
    socialMedia3,
    description,
    experience,
  } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    login,
    name,
    email,
    password,
    socialMedia1,
    socialMedia2,
    socialMedia3,
    description,
    experience,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      login: user.login,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      isBuyer: user.isBuyer,
      socialMedia1: user.socialMedia1,
      socialMedia2: user.socialMedia2,
      socialMedia3: user.socialMedia3,
      description: user.description,
      experience: user.experience,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//? @desk     Verify token and make secret perm
//? @rout     POST /api/users/verify
//? @access   Private

// const verifyUser = asyncHandler(async (req, res) => {
//   const { token } = req.body

//   try {
//     const user = await User.findById(req.params.id)
//     const { base32: secret } = user.temp_secret

//     const verified = speakeasy.totp.verify({
//       secret,
//       encoding: 'base32',
//       token,
//     })

//     if (verified) {
//       res.json({ verified: true })
//     } else {
//       res.json({ verified: false })
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error finding user' })
//   }
// })

//? @desk     Get user pofile
//? @rout     GET /api/users/profile
//? @access   Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      isBuyer: user.isBuyer,
      isVerifyed: user.isVerifyed,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//? @desk     Update user pofile
//? @rout     PUT /api/users/profile
//? @access   Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
      isBuyer: updatedUser.isBuyer,
      isVerifyed: updatedUser.isVerifyed,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//? @desk     Get all users
//? @rout     GET /api/users
//? @access   Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

//? @desk     Delete user
//? @rout     DELETE /api/users/:id
//? @access   Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//? @desk     Get user by ID
//? @rout     GET /api/users/:id
//? @access   Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//? @desk     Update user
//? @rout     PUT /api/users/:id
//? @access   Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    user.isSeller = req.body.isSeller
    user.isBuyer = req.body.isBuyer
    user.isVerifyed = req.body.isVerifyed

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: updatedUser.isSeller,
      isBuyer: updatedUser.isBuyer,
      isVerifyed: updatedUser.isVerifyed,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  // verifyUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
