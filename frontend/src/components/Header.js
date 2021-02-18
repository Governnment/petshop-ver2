import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import DarkToggle from './DarkToggle'

import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>PetShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <DarkToggle />
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              {/* <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i>Cart
                </Nav.Link>
              </LinkContainer> */}
              <LinkContainer to='/about-us'>
                <Nav.Link>О нас</Nav.Link>
              </LinkContainer>
              <NavDropdown title='Условия'>
                <LinkContainer to='/seller-info'>
                  <NavDropdown.Item>Для продавца</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/buyer-info'>
                  <NavDropdown.Item>Для покупателя</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/delivery-info'>
                  <NavDropdown.Item>Доставка и Оплата</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Профиль</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Выйти
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>Войти
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isSeller && (
                <LinkContainer to='/seller/seller-screen'>
                  <Nav.Link>Аккаунт продавца</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Админка' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Пользователи</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Питомцы</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/slidelist'>
                    <NavDropdown.Item>Слайды</NavDropdown.Item>
                  </LinkContainer>
                  {/* <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer> */}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
