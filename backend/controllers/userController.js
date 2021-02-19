import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import speakeasy from 'speakeasy'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import Review from '../models/reviewModel.js'

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
      rating: user.rating,
      reviews: user.reviews,
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
    rating,
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
    rating,
    reviews,
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
      rating: user.rating,
      reviews: user.reviews,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//? @desk     Get user pofile
//? @rout     GET /api/users/profile
//? @access   Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const reviews = await Review.find({
      sellerUserId: req.user._id
    })
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
      isBuyer: user.isBuyer,
      reviews,
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

//? @desk     Create new seller review
//? @rout     POST /api/users/:id/sellerReview
//? @access   Private

const createSellerReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const user = await User.findById(req.user._id)
  const product = await Product.findById(req.params.id)

  if (user) {
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      sellerUserId: product.userId,
    })

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Вы уже оставили отзыв')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      sellerUserId: product.userId,
    }

    await Review.create(review)

    res.status(201).json({ message: 'Отзыв добавлен' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//? @desk     Get seller reviews
//? @rout     GET /api/user/sellerReviews
//? @access   Private

const getSellerReview = asyncHandler(async (req, res) => {
  if (reviews) {
    const user = await User.find({}).populate('rating', 'comment')
    res.json(user)
  } else {
    res.status(404)
    throw new Error('Review not found')
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
  createSellerReview,
  getSellerReview,
}
