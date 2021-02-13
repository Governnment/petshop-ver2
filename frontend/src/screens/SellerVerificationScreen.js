import React from 'react'
import {Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import FormContainer from '../components/FormContainer'
import signupImg from '../Images/illustrations/clip-sign-up.png'

const SellerVerificationScreen = (location, history) => {
  const redirect = location.search ? location.search.split('=')[1] : '/'



  return (
  
    <FormContainer>
      <h1 className='text-center'>Sign Up</h1>
      <img src={signupImg} className='w-100' />
      <div className='text-center'>
      <h2 className='align-center line-height'>Ваша заявка на регистрацию аккаунта продавца рассматривается</h2>
      
      <LinkContainer to={
              redirect
                ? `/?redirect=${redirect}`
                : '/'
            }>
      <Button type='submit' variant='primary'>
          
        
          Посмотреть объявления
          </Button>
          </LinkContainer>
           </div>
      </FormContainer>
   
      )
}

export default SellerVerificationScreen
