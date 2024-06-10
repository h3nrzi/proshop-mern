import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../api/orders-api";
import { RootState } from "../app/store";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const paymentMethod = useSelector((state: RootState) => state.cart.paymentMethod);
  const [, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!paymentMethod) {
      toast.warn("Please enter a payment method!");
      navigate("/payment");
    }
  }, [navigate, paymentMethod]);

  const placeorderHandler = async () => {};

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong className="me-1">Address:</strong>
                {cart.shippingAddress?.address}, {cart.shippingAddress?.city},{" "}
                {cart.shippingAddress?.postalCode}, {cart.shippingAddress?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong className="me-1">Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.orderItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                cart.orderItems.map((item) => (
                  <ListGroup key={item._id}>
                    <Row className="gap-1 align-items-center">
                      <Col md={1} className="my-1">
                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                      </Col>

                      <Col className="my-1">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>

                      <Col md={4}>
                        <p className="fw-bold">
                          {item.qty} X ${item.price} = ${item.qty * item.price}
                        </p>
                      </Col>
                    </Row>
                  </ListGroup>
                ))
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items Price:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax Price:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="text-center">
                <Button
                  type="button"
                  variant="success"
                  className="text-white px-5"
                  disabled={cart.orderItems.length === 0}
                  onClick={placeorderHandler}
                >
                  Place Order
                  {isLoading && <Spinner size="sm" className="ms-2" />}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
