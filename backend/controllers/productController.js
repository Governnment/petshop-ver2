import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Review from '../models/reviewModel.js'

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

  const count = await Product.countDocuments({ ...keyword })
  let products = await Product.find({ ...keyword }) 
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  products = JSON.parse(JSON.stringify(products))
  for (let i = 0; i < products.length; i++) {
    products[i].userReviews = await Review.find({
      sellerUserId: products[i].userId,
    })
    products[i].userNumReviews = products[i].userReviews.length
    products[i].userRating =
      products[i].userReviews.reduce((acc, item) => item.rating + acc, 0) /
      products[i].userReviews.length
  }

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})
//? @desk     Fetch a product by ID
//? @rout     GET /api/products>:id
//? @access   Public

const getProductById = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id)

  if (product) {
    product = JSON.parse(JSON.stringify(product))
    product.userReviews = await Review.find({ sellerUserId: product.userId })
    product.userNumReviews = product.userReviews.length
    product.userRating =
      product.userReviews.reduce((acc, item) => item.rating + acc, 0) /
      product.userReviews.length

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
    type: 'Вид животного',
    name: 'Кличка',
    price: 0,
    user: req.user._id,
    userId: req.user._id,
    userLogin: req.user.login,
    image: '/images/sample.jpg',
    gender: 'Пол',
    category: 'Категория',
    countInStock: 0,
    numReviews: 0,
    description: 'Описание',
    breedCode: 'Код породы',
    colorCode: 'Код окраса',
    isPet: false,
    breedingPrice: 0,
    defects: 'Дефекты',
    weight: 0,
    birthdate: 0,
    vaccination: 'Да/Нет Дата',
    parentImage: '/images/sample.jpg',
    favorite: false,
  })

  const createProduct = await product.save()
  res.status(201).json(createProduct)
})

//? @desk     Seller.Create a product
//? @rout     POST /api/products
//? @access   Private/Seller

const createProductSeller = asyncHandler(async (req, res) => {
  const product = new Product({
    type: 'Вид животного',
    name: 'Кличка',
    price: 0,
    user: req.user._id,
    userId: req.user._id,
    userLogin: req.user.login,
    image: '/images/sample.jpg',
    gender: 'Пол',
    description: 'Описание',
    breedCode: 'Код породы',
    colorCode: 'Код окраса',
    isPet: false,
    breedingPrice: 0,
    defects: 'Дефекты',
    weight: 0,
    birthdate: 0,
    vaccination: 'Да/Нет Дата',
    parentImage: '/images/sample.jpg',
    city: 'Ваш город',
    favorite: false,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//? @desk     Update a product
//? @rout     PUT /api/product/:id
//? @access   Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.type = type
    product.name = name
    product.price = price
    product.gender = gender
    product.description = description
    product.breedCode = breedCode
    product.colorCode = colorCode
    product.isPet = isPet
    product.breedingPrice = breedingPrice
    product.defects = defects
    product.weight = weight
    product.birthdate = birthdate
    product.vaccination = vaccination
    product.city = city
    product.image = image
    product.parentImage = parentImage

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

  const user = await User.findById(req.user._id)
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      sellerUserId: product.userId,
    })

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      sellerUser: product.userId,
    }

    await Review.create(review)
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
