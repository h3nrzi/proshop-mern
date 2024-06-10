import moment from "moment";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../api/orders-api";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderPage = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);

  if (isLoading) return <Loader />;
  if (error) return null;
  if (!order) return;

  return (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong className="me-1">Name:</strong>
                {order.user.name}
              </p>
              <p>
                <strong className="me-1">Email:</strong>
                {order.user.email}
              </p>
              <p>
                <strong className="me-1">Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              <p>
                <strong className="me-1">Order At:</strong>
                {moment(order.createdAt).format("dddd, MMMM Do YYYY, h:mm a")}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt!}</Message>
              ) : (
                <Message variant="danger">Not Delivered!</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt!}</Message>
              ) : (
                <Message variant="danger">Not Paid!</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item) => (
                <ListGroup key={item._id}>
                  <Row className="align-align-items-center">
                    <Col md={1} className="my-1">
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col className="my-1">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>

                    <Col md={4}>
                      <p className="fw-bold">
                        {item.qty} X ${item.price} = ${item.qty * item.price}
                      </p>
                    </Col>
                  </Row>
                </ListGroup>
              ))}
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax Price:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* PAY ORDER PLACEHOLDER */}
              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
