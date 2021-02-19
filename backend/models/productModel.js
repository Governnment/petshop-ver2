import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    userLogin: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    parentImage: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    userRating: {
      type: Number,
      required: false,
      default: 0,
    },
    userReviews: [reviewSchema],
    userNumReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    breedCode: {
      type: String,
      required: true,
    },
    colorCode: {
      type: String,
      required: true,
    },
    isPet: {
      type: Boolean,
      required: false,
    },
    breedingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    defects: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      default: 0,
    },
    birthdate: {
      type: String,
      required: true,
      default: '01.01.21',
    },
    vaccination: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
