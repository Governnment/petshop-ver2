import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import SlidesListScreen from './screens/SlidesListScreen'
import SlideEditScreen from './screens/SlideEditScreen'
import RegisterSellerScreen from './screens/RegisterSellerScreen'
import SellerVerificationScreen from './screens/SellerVerificationScreen'
import SellerScreen from './screens/SellerScreen'
import SellerProductEditScreen from './screens/SellerProductEditScreen'
import SellerProfileScreen from './screens/SellerProfileScreen'
import AboutUs from './screens/AboutUs'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} /> */}
          <Route path='/login' component={LoginScreen} />
          <Route path='/seller-register' component={RegisterSellerScreen} />
          <Route
            path='/sellerVerificationScreen'
            component={SellerVerificationScreen}
          />
          <Route path='/seller/seller-screen' component={SellerScreen} />
          <Route
            path='admin/seller-profile-screen/:id'
            component={SellerProfileScreen}
          />
          <Route
            path='/seller/product/:id/edit'
            component={ProductEditScreen}
          />
          <Route
            path='/seller/product/:id/change'
            component={SellerProductEditScreen}
          />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          {/* <Route path='/cart/:id?' component={CartScreen} /> */}
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          {/* <Route path='/admin/orderlist' component={OrderListScreen} /> */}
          <Route path='/admin/slidelist' component={SlidesListScreen} />
          <Route path='/admin/slider/:id/edit' component={SlideEditScreen} />

          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/about-us' component={AboutUs} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
