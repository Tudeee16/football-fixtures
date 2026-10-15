import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { NavLink } from "react-router-dom" 

function AppNavbar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="sm">
            <Container>
                <Navbar.Brand as={NavLink} to ="/">Football app</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav>
                        <Nav.Link as={NavLink} to="/" end>Search</Nav.Link>
                        <Nav.Link as={NavLink} to="/favorites">My Teams</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
              
    )
}

export default AppNavbar