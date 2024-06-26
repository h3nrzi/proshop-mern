import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../app/cart-slice";
import { RootState } from "../app/store";
import Message from "../components/Message";
import Product from "../entities/Product";
import CheckoutSteps from "../components/CheckoutSteps";
import { toast } from "react-toastify";

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.orderItems);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (item: Product, value: number) => {
    dispatch(addToCart({ ...item, qty: value }));
  };

  const removeFromCartHandler = (_id: string) => {
    dispatch(removeFromCart({ _id }));
  };

  const checkoutHandler = () => {
    if (!userInfo) toast.warn("Please login first!", { position: "top-center" });
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <CheckoutSteps step1 />
      <Col md={8}>
        <h1 className="mb-5">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} className="mb-5">
                <Row className="align-items-center text-center gap-2 gap-md-0">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>

                  <Col md={3}>${item.price}</Col>

                  <Col md={2}>
                    {
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, +e.target.value)}
                      >
                        {[...Array(item.countInStock).keys()].map((i) => (
                          <option value={i + 1} key={i + 1} className="text-center">
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    }
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="danger"
                      className="text-white"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Subtotal
                <span className="mx-1">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                Items
              </h3>
              <h6>${cartItems.reduce((acc, item) => (acc + item.price) * item.qty, 0)}</h6>
            </ListGroup.Item>

            <ListGroup.Item className="text-center">
              <Button
                type="button"
                className="px-5 text-white"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
