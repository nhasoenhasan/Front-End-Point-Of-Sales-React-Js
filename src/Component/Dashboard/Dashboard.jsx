import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup, ListGroupItem } from 'reactstrap';
import Productlist from '../Product/Product';

const Dashboard = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div >
      <Navbar color="dark" light className="fixed-top" expand="md"  >
        <NavbarBrand className="text-white" href="/">Lawless </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto " navbar>
            <NavItem>
              <NavLink  className="text-white" href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink  className="text-white" href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle  className="text-white" nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu  className="text-white" right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem >
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem  >
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
        <ListGroup style={{width:"7%",position:"fixed",height:"100%",marginTop:"4%",backgroundColor:"red"}}>
          <ListGroupItem>A</ListGroupItem>
          <ListGroupItem>B</ListGroupItem>
          <ListGroupItem>B</ListGroupItem>
          <ListGroupItem>C</ListGroupItem>
          <ListGroupItem>D</ListGroupItem>
        </ListGroup>
      <Productlist /> 
  </div>
  );
}

export default Dashboard;
