import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import Link from 'next/link'

const SiteNavbar = (): JSX.Element => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/" as={Link}>Monster Sanctuary Data Explorer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href='/' as={Link}>Home</Nav.Link>
                            <Nav.Link href='/about' as={Link}>About</Nav.Link>
                            <Nav.Link href='/privacy' as={Link}>Privacy</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
};

export default SiteNavbar;