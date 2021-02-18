import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//? @desk     Fetch all producs
//? @rout     GET /api/products
//? @access   Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, //regex parameter for not exact serach
          $options: 'i',
        },
      }
    : {}

  // let findArgs = {}

  // console.log(req.body.filters)

  // for (let key in req.body.filters) {
  //   if (req.body.filters[key].length > 0) {
  //     if (key === 'price') {
  //     } else {
  //       findArgs[key] = req.body.filter[key]
  //     }
  //   }
  // }

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})
//? @desk     Fetch a product by ID
//? @rout     GET /api/products>:id
//? @access   Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//? @desk     Delete a product
//? @rout     DELETE /api/products/:id
//? @access   Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//? @desk     Seller.Delete a product
//? @rout     DELETE /api/products/:id
//? @access   Private/Seller

const SellerDeleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//? @desk     Admin.Create a product
//? @rout     POST /api/products
//? @access   Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample descripton',
  })

  const createProduct = await product.save()
  res.status(201).json(createProduct)
})

//? @desk     Seller.Create a product
//? @rout     POST /api/products
//? @access   Private/Seller

const createProductSeller = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    userId: req.user._id,
    userLogin: req.user.login,
    userRating: 0,
    userReviews: [],
    userNumReviews: 0,
    image: '/images/sample.jpg',
    gender: 'Sample gender',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample descripton',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//? @desk     Update a product
//? @rout     PUT /api/product/:id
//? @access   Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//? @desk     Seller.Update a product
//? @rout     PUT /api/product/:id
//? @access   Private/Seller

const SellerUpdateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    gender,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.gender = gender
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//? @desk     Create new review
//? @rout     POST /api/product/:id/review
//? @access   Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.product.toString() === req.params.id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      product: req.params.id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//? @desk     Get reviews
//? @rout     GET /api/product/reviews
//? @access   Private

const getProductReview = asyncHandler(async (req, res) => {
  if (reviews) {
    const products = await Product.find({}).populate('rating', 'comment')
    res.json(products)
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

//? @desk     Get top rated products
//? @rout     GET /api/product/top
//? @access   Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

//? @desk     Seller.Fetch all producs
//? @rout     GET /api/products
//? @access   Public

const getSellersProducts = asyncHandler(async (req, res) => {
  const SellersProducts = await Product.find({ user: req.user.id })

  res.json({ products: SellersProducts })
})

export {
  getProducts,
  getSellersProducts,
  getProductById,
  deleteProduct,
  SellerDeleteProduct,
  createProduct,
  createProductSeller,
  updateProduct,
  SellerUpdateProduct,
  createProductReview,
  getProductReview,
  getTopProducts,
}
