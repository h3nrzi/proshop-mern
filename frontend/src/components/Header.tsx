import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../api/users-api";
import { clearCredentials } from "../app/auth-slice";
import { RootState } from "../app/store";
import logo from "../assets/logo.png";

const Header = () => {
  const orderItems = useSelector((state: RootState) => state.cart.orderItems);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      toast.success("logged out successfully!", { position: "top-center" });
      navigate("/");
    } catch (err) {
      toast.error("some error occurred!", { position: "top-center" });
    }
  };

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
                  <FaShoppingCart size="20px" /> Cart
                  {orderItems.length > 0 && (
                    <Badge bg="success" className="ms-2">
                      {orderItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username" className="mx-md-5">
                  <Link to="/profile" className="text-decoration-none">
                    <NavDropdown.Item as="span">Profile</NavDropdown.Item>
                  </Link>

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login" className="text-decoration-none mx-md-5">
                  <Nav.Link as="span">
                    <FaUser /> Sign In
                  </Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
