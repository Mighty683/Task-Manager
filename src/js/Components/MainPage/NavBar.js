import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler,
  NavItem,
  NavLink,
  Nav } from 'reactstrap'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {...props}
    this.toggle = this.toggle.bind(this)
    this.state.isOpen = false
  }

  toggle () {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }))
  }

  render () {
    return (
      <div className='nav-bar'>
        <Navbar color='light' light expand='md'>
          <NavbarBrand href='/'>Welcome</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            { this.props.user.token && <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink onClick={this.state.goToTasks}>Tasks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.state.goToAdminPanel}>Admin Panel</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.state.logout}>Logout</NavLink>
              </NavItem>
            </Nav>}
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => ({user: state.user})

export default connect(
  mapStateToProps
)(NavBar)
