import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, SellerUpdateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstans'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [parentImage, setParentImage] = useState('')
  const [price, setPrice] = useState(0)
  const [gender, setGender] = useState('')
  const [description, setDescription] = useState('')
  const [breedCode, setBreedCode] = useState('')
  const [colorCode, setColorCode] = useState('')
  const [isPet, setIsPet] = useState(false)
  const [breedingPrice, setBreedingPrice] = useState(0)
  const [defects, setDefects] = useState('')
  const [weight, setWeight] = useState(0)
  const [birthdate, setBirthdate] = useState(0)
  const [vaccination, setVaccination] = useState('')
  const [city, setCity] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setType(product.type)
        setName(product.name)
        setImage(product.image)
        setParentImage(product.parentImage)
        setPrice(product.price)
        setGender(product.gender)
        setDescription(product.description)
        setBreedCode(product.breedCode)
        setColorCode(product.colorCode)
        setIsPet(product.isPet)
        setBreedingPrice(product.breedingPrice)
        setDefects(product.defects)
        setWeight(product.weight)
        setBirthdate(product.birthdate)
        setVaccination(product.vaccination)
        setCity(product.city)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      SellerUpdateProduct({
        _id: productId,
        name,
        price,
        image,
        description,
        type,
        name,
        image,
        parentImage,
        price,
        gender,
        description,
        breedCode,
        colorCode,
        isPet,
        breedingPrice,
        defects,
        weight,
        birthdate,
        vaccination,
        city,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Alert variant='danger'>{error}</Alert>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Кличка</Form.Label>
              <Form.Control
                type='name'
                placeholder='Укажите кличку'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='type'>
              <Form.Label>Вид животного</Form.Label>
              <Form.Control
                type='type'
                placeholder='Укажите вид животного'
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type='number'
                placeholder='Укажите цену'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='gender'>
              <Form.Label>Пол</Form.Label>
              <Form.Control
                type='text'
                placeholder='Укажите пол'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Фото питомца</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите ссылку на фото'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='parentImage'>
              <Form.Label>Фото родителей</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите ссылку на фото'
                value={parentImage}
                onChange={(e) => setParentImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите описание'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='breedCode'>
              <Form.Label>Код породы</Form.Label>
              <Form.Control
                type='text'
                placeholder='Укажите код породы'
                value={breedCode}
                onChange={(e) => setBreedCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='colorCode'>
              <Form.Label>Код окраса</Form.Label>
              <Form.Control
                type='text'
                placeholder='Укажите код окраса'
                value={colorCode}
                onChange={(e) => setColorCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isPet'>
              <Form.Label>Это питомец или в разведение?</Form.Label>
              <Form.Check
                type='checkbox'
                label='В разведение'
                checked={isPet}
                onChange={(e) => setIsPet(e.target.checked, !isPet)}
                checked={isPet}
              ></Form.Check>
            </Form.Group>

            {isPet ? (
              <Form.Group controlId='breedingPrice'>
                <Form.Label>Цена в разведение</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Укажите цена в разведение'
                  value={breedingPrice}
                  onChange={(e) => setBreedingPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
            ) : null}

            <Form.Group controlId='defects'>
              <Form.Label>Дефекты</Form.Label>
              <Form.Control
                type='text'
                placeholder='Есть ли какие-то дефекты у питомца?'
                value={defects}
                onChange={(e) => setDefects(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='weight'>
              <Form.Label>Вес</Form.Label>
              <Form.Control
                type='number'
                placeholder='Укажите вес'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='birthdate'>
              <Form.Label>Дата рождения</Form.Label>
              <Form.Control
                type='number'
                placeholder='Укажите дату рождения'
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='vaccination'>
              <Form.Label>Есть ли прививки, если есть укажите даты</Form.Label>
              <Form.Control
                type='text'
                placeholder='Укажите даты прививки'
                value={vaccination}
                onChange={(e) => setVaccination(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>Укажите город, в котором продате питомца</Form.Label>
              <Form.Control
                type='text'
                placeholder='Укажите даты прививки'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Добавить
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
