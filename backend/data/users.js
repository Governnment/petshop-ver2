import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    experience: 2,
    description: 'desc43',
    socialMedia1: 'desc43',
    login: 'Admin',
  },
  {
    name: 'Angela Winn',
    email: 'angela@example.com',
    password: bcrypt.hashSync('123456', 10),
    isBuyer: true,
    experience: 2,
    description: 'desc43',
    socialMedia1: 'desc43',
    login: 'Buyer',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isSeller: true,
    experience: 2,
    description: 'desc43',
    socialMedia1: 'desc43',
    login: 'Seller',
  },
]

export default users
