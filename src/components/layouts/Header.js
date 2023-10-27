
import { Link } from 'react-router-dom';
import { Navbar,Nav,Container } from "react-bootstrap";

const Header =()=>{
    return(
        <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/search">search</Nav.Link>
                    <Nav.Link as={Link} to="/register">register</Nav.Link>
                    <Nav.Link as={Link} to="/login">login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        </>     
 
    )
}

export default Header