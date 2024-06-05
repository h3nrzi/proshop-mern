import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Header = () => {
  const { cartItems } = useSelector((rootState: RootState) => rootState.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            <Navbar.Brand>
              <img src={logo} alt="proshop" />
              Proshop
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/cart" className="text-decoration-none">
                <Nav.Link as="span">
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge bg="success" className="ms-2">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </Link>

              <Link to="/login" className="text-decoration-none ms-3">
                <Nav.Link as="span">
                  <FaUser /> Sign In
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
