import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import axios from 'axios'
import {
  listProducts,
  SellerDeleteProduct,
  createProduct,
  sellerCreateProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstans'

const SellerScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList
  const [sellerProducts, setSellerProducts] = useState([])

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const sellerProductCreate = useSelector((state) => state.sellerProductCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = sellerProductCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isSeller) {
      history.push('/login')
    }

    const userInfoS = localStorage.getItem('userInfo')
    const userDataS = JSON.parse(userInfoS)
    let token
    if (userDataS !== null) {
      token = userDataS.token
    }
    axios
      .get(`/api/products/seller/products`, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setSellerProducts(response.data.products)
      })
      .catch((error) => {
        console.log(error)
      })
    if (successCreate) {
      history.push(`/seller/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const createProductHandler = () => {
    dispatch(sellerCreateProduct())
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(SellerDeleteProduct(id))
    }
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Питомцы</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Добавить питомца
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}
      {loadingCreate && <Loader />}
      {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>}
      {products.length === 0 && <Alert>Your cart is empty</Alert>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Цена</th>
                <th>Категория</th>
                <th>Гендер</th>
              </tr>
            </thead>
            <tbody>
              {sellerProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>$ {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.gender}</td>
                  <td>
                    <LinkContainer to={`/seller/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm fit'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm fit'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default SellerScreen
