import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [login, setLogin] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSeller, setIsSeller] = useState(false)
  const [isBuyer, setIsBuyer] = useState(false)
  const [socialMedia1, setSocialMedia1] = useState('')
  const [socialMedia2, setSocialMedia2] = useState('')
  const [socialMedia3, setSocialMedia3] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setLogin(user.login)
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setIsSeller(user.isSeller)
        setIsBuyer(user.isBuyer)
        setSocialMedia1(user.socialMedia1)
        setSocialMedia2(user.socialMedia2)
        setSocialMedia3(user.socialMedia3)
        setDescription(user.description)
        setExperience(user.experience)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        login,
        name,
        email,
        isAdmin,
        isSeller,
        isBuyer,
        socialMedia1,
        socialMedia2,
        socialMedia3,
        description,
        experience,
      })
    )
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Пользователь</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='name'>
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type='name'
                placeholder='Введите имя'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Почта</Form.Label>
              <Form.Control
                type='email'
                placeholder='Введите почту'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Админ'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isseller'>
              <Form.Check
                type='checkbox'
                label='Продавец'
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isbuyer'>
              <Form.Check
                type='checkbox'
                label='Покупатель'
                checked={isBuyer}
                onChange={(e) => setIsBuyer(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='socialMedia1'>
              <Form.Label>Социальная сеть №1</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите ссылку на соц.сеть'
                value={socialMedia1}
                onChange={(e) => setSocialMedia1(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='socialMedia2'>
              <Form.Label>Социальная сеть №2</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите ссылку на соц.сеть'
                value={socialMedia2}
                onChange={(e) => setSocialMedia2(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='socialMedia3'>
              <Form.Label>Социальная сеть №3</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите ссылку на соц.сеть'
                value={socialMedia3}
                onChange={(e) => setSocialMedia3(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Информация о продавце</Form.Label>
              <Form.Control
                type='text'
                placeholder='Введите ссылку на соц.сеть'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='experience'>
              <Form.Label>Опыт</Form.Label>
              <Form.Control
                type='text'
                placeholder='Опыт'
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Обновить
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
