import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { newSellerRegister } from '../actions/userActions'
import signupImg from '../Images/illustrations/clip-sign-up.png'

const RegisterScreen = ({ location, history }) => {
  const [login, setLogin] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [socialMedia1, setSocialMedia1] = useState('')
  const [socialMedia2, setSocialMedia2] = useState('')
  const [socialMedia3, setSocialMedia3] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const sellerRegister = useSelector((state) => state.sellerRegister)
  const { loading, error, userInfo } = sellerRegister

  useEffect(() => {
    if (userInfo) {
      history.push('/sellerVerificationScreen')
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        newSellerRegister(
          login,
          name,
          email,
          password,
          socialMedia1,
          socialMedia2,
          socialMedia3,
          description,
          experience
        )
      )
    }
  }

  return (
    <FormContainer>
      <h1 className='text-center'>Регистрация</h1>
      {message && <Alert variant='danger'>{message}</Alert>}
      {error && <Alert variant='danger'>{error}</Alert>}
      {loading && <Loader />}
      <img src={signupImg} className='w-100' />
      <h2>Зарегистрируйтесь для размещения объявления</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='login'>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type='login'
            placeholder='Укажите логин'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type='name'
            placeholder='Введите ваше имя'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Введите ваш email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Введите ваш пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Подтвердить пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Подтвердите пароль'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='socialMedia1'>
          <Form.Label>
            Укажите ссылку на вашу соц.сеть для подтверждения
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Ссылка на вашу соц.сеть'
            value={socialMedia1}
            onChange={(e) => setSocialMedia1(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='socialMedia2'>
          <Form.Label>
            Укажите ссылку на другую вашу соц.сеть для подтверждения
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Ссылка на вашу соц.сеть'
            value={socialMedia2}
            onChange={(e) => setSocialMedia2(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='socialMedia3'>
          <Form.Label>
            Укажите ссылку на другую вашу соц.сеть для подтверждения
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Ссылка на вашу соц.сеть'
            value={socialMedia3}
            onChange={(e) => setSocialMedia3(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Расскажите немного о себе</Form.Label>
          <Form.Control
            type='text'
            placeholder='Расскажите немного о себе'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='experience'>
          <Form.Label>Сколько лет занимаетесь разведением?</Form.Label>
          <Form.Control
            type='number'
            placeholder='Сколько лет занимаетесь разведением'
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Зарегистрироваться
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          У вас есть аккаунт? <Link to={'/login'}>Войти</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
