import {
  DISPATCH_ACTION,
  PayPalButtons,
  PayPalButtonsComponentProps,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import moment from "moment";
import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../api/orders-api";
import { RootState } from "../app/store";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderPage = () => {
  const { id: orderId } = useParams();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const order = useGetOrderQuery(orderId!);
  const paypalClientId = useGetPayPalClientIdQuery();
  const [payOrder, { isLoading: payOrderLoading }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!paypalClientId.error && !paypalClientId.isLoading && paypalClientId.data?.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: { clientId: paypalClientId.data?.clientId, currency: "USD" },
        });

        paypalDispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };

      if (order && !order.data?.isPaid) if (!window.paypal) loadPaypalScript();
    }
  }, [
    order,
    paypalClientId.data?.clientId,
    paypalClientId.error,
    paypalClientId.isLoading,
    paypalDispatch,
  ]);

  if (order.isLoading) return <Loader />;
  if (order.error) return null;
  if (!order.data) return null;

  const onApprove: PayPalButtonsComponentProps["onApprove"] = (data, actions) => {
    return actions.order!.capture().then(async (details) => {
      try {
        await payOrder({ orderId: orderId!, details });
        order.refetch();
        toast.success("Payment successful!", { position: "top-center" });
      } catch (err: any) {
        toast.error(err?.data?.message || err.message, {
          position: "top-center",
        });
      }
    });
  };

  const onApproveTest = async () => {
    const details = { payer: { email_address: "rezaeig22@gmail.com" } };
    await payOrder({ orderId: orderId!, details });
    order.refetch();
    toast.success("Payment successful!", { position: "top-center" });
  };

  const createOrder: PayPalButtonsComponentProps["createOrder"] = (data, actions) => {
    return actions.order
      .create({
        intent: "CAPTURE",
        purchase_units: [
          { amount: { currency_code: "USD", value: order.data.totalPrice.toString() } },
        ],
      })
      .then((orderId) => orderId);
  };

  const onError: PayPalButtonsComponentProps["onError"] = (err) => {
    if (err instanceof Error) toast.error(err.message, { position: "top-center" });
  };

  const {
    _id,
    isDelivered,
    createdAt,
    isPaid,
    itemsPrice,
    orderItems,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
    user,
    deliveredAt,
    paidAt,
  } = order.data;

  return (
    <>
      <h1>Order {_id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong className="me-1">Name:</strong>
                {user.name}
              </p>
              <p>
                <strong className="me-1">Email:</strong>
                {user.email}
              </p>
              <p>
                <strong className="me-1">Address:</strong>
                {shippingAddress.address}, {shippingAddress.city},{shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
              <p>
                <strong className="me-1">Order at:</strong>
                {moment(createdAt).format("dddd, MMMM Do YYYY, h:mm a")}
              </p>
              {isDelivered ? (
                <Message variant="success">
                  Delivered on
                  {moment(deliveredAt!).format("dddd, MMMM Do YYYY, h:mm a")}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered!</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <Message variant="success">
                  Paid on: {moment(paidAt!).format("dddd, MMMM Do YYYY, h:mm a")}
                </Message>
              ) : (
                <Message variant="danger">Not Paid!</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderItems.map((item) => (
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
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax Price:</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!isPaid && (
                <ListGroup.Item className="text-center">
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        variant="success"
                        className="text-white px-5 mb-2"
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                        {payOrderLoading && <Spinner size="sm" className="ms-2" />}
                      </Button>

                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      />
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {/* MARK AS DELIVERED PLACEHOLDER */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
