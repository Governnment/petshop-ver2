import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Carousel,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Alert from '../components/Alert'
import {
  listProductDetails,
  deleteProduct,
  createSellerReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstans'
import noCommentsImg from '../Images/illustrations/clip-no-messages.png'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productDelete = useSelector((state) => state.productDelete)
  const { success: successDelete } = productDelete

  const sellerReviewCreate = useSelector((state) => state.sellerReviewCreate)
  const {
    error: errorSellerReview,
    success: successSellerReview,
  } = sellerReviewCreate

  useEffect(() => {
    if (successSellerReview) {
      //alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(listProductDetails(match.params.id))

    if (successDelete) {
      history.push('/')
    }
  }, [dispatch, history, match, successDelete, successSellerReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createSellerReview(match.params.id, {
        rating,
        comment,
      })
    )
  }
  return (
    <>
      <Link to='/' className='btn btn-light my-3 btn-back'>
        Назад
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Carousel className='product-page-carousel'>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src={product.image}
                    alt='First slide'
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src={product.image}
                    alt='Second slide'
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className='d-block w-100'
                    src={product.image}
                    alt='Third slide'
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
              {/* <Image
                src={product.image}
                alt={product.name}
                fluid
                className='rounded-product-img'
              /> */}
            </Col>
            <Col md={4}>
              <ListGroup variant='flush' className='product-details'>
                <ListGroup.Item className='list-group-item-dark m-1'>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item-dark m-1'>
                  <Rating
                    value={product.userRating}
                    text={`${product.userNumReviews} рейтинг продавца`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item-dark m-1 product-details-price'>
                  Цена: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item-dark m-1 product-details-description'>
                  Описание: {product.description}
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item-dark m-1 product-details-description'>
                  Гендер: {product.gender}
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item-dark m-1 product-details-description'>
                  Дата рождения: {product.birthdate}
                </ListGroup.Item>

                {product.isPet ? (
                  <ListGroup.Item className='list-group-item-dark m-1 product-details-description'>
                    Питомец
                  </ListGroup.Item>
                ) : (
                  <>
                    <ListGroup.Item className='list-group-item-dark m-1 product-details-description'>
                      Для разведения
                    </ListGroup.Item>
                    <ListGroup.Item className='list-group-item-dark m-1 product-details-description'>
                      Цена для разведения: {product.breedingPrice}$
                    </ListGroup.Item>
                  </>
                )}
                <ListGroup.Item className='list-group-item-dark m-1 product-details-description'>
                  Дата публикации:{' '}
                  {product.createdAt && product.createdAt.substring(0, 10)}
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item-dark m-1 product-details-description'>
                  Дата последнего обновления: <br />{' '}
                  {product.updatedAt && product.updatedAt.substring(0, 10)}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              {/* <Card>
                <ListGroup variant='flash' className='product-screen-summary'>
                  <ListGroup.Item className='list-group-item-dark'>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item> */}

              {/* <ListGroup.Item className='list-group-item-dark'>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock >= 1
                          ? `In Stock: ${product.countInStock}`
                          : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item> */}

              {/* {product.countInStock > 0 && (
                    <ListGroup.Item className='list-group-item-dark'>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )} */}

              {/* <ListGroup.Item className='list-group-item-dark'>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item> 
                </ListGroup>
              </Card>*/}
              {userInfo && userInfo.isAdmin && (
                <ListGroup className='py-3 product-screen-admin'>
                  <ListGroup.Item className='list-group-item-dark'>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button
                        className='btn-block btn-edit'
                        type='button'
                        variant='warning'
                      >
                        <i className='fas fa-pen'></i> Редактировать
                      </Button>
                    </LinkContainer>
                    <Button
                      className='btn-block btn-delete mt-3'
                      type='button'
                      variant='danger'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i> Удалить
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Col>
          </Row>
          <Row className='product-screen-review '>
            <Col md={6}>
              <h2 className='p-3'>Отзывы о продавце {product.userLogin}</h2>
              {!product.userReviews ||
                (product.userReviews.length === 0 && (
                  <>
                    <img className='w-100' src={noCommentsImg} alt='review' />
                    <Alert>No Reviews</Alert>
                  </>
                ))}
              <ListGroup variant='flush' className='list-group-item-dark'>
                {product.userReviews &&
                  product.userReviews.map((review) => (
                    <ListGroup.Item
                      key={review._id}
                      className='list-group-item-dark'
                    >
                      <strong>{review.name}</strong>
                      <div className='my-2'>
                        <Rating value={review.rating} />
                      </div>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item className='list-group-item-dark'>
                  <h2>Write a Review </h2>
                  {errorSellerReview && (
                    <Alert variant='danger'>{errorSellerReview}</Alert>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3' //size of text area
                          placeholder='Write your review'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Alert>
                      Please{' '}
                      <Link to='/loging' className='normal-link'>
                        sign in
                      </Link>{' '}
                      to write a review
                    </Alert>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
