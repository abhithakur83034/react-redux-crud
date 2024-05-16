import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const index = () => {
  return (
    <div>
    <Navbar className="bg">
    <Container fluid>
      <Navbar.Brand  as={Link} to='/' className='main'>TODO</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Nav className="">
      <Nav as={Link} to='/manage' className='lnk'>Create_User</Nav>
      <Nav as={Link} to='/addproduct' className='lnk'>Add_PProduct</Nav>
    </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    </div>
  )
}

export default index
