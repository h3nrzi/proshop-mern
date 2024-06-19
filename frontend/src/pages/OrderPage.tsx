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
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderQuery,
  useGetPayPalClientIdQuery,
  useUpdateOrderToDeliverMutation,
  useUpdateOrderToPaidMutation,
} from "../api/orders-api";
import { RootState } from "../app/store";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderPage = () => {
  const { id: orderId } = useParams();

  const navigate = useNavigate();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const {
    data: order,
    isLoading: orderLoading,
    error: orderError,
    refetch: orderRefetch,
  } = useGetOrderQuery(orderId!);

  const {
    data: paypal,
    isLoading: paypalLoading,
    error: paypalError,
  } = useGetPayPalClientIdQuery();

  const [updateOrderToPaidMutation, { isLoading: updateOrderToPaidLoading }] =
    useUpdateOrderToPaidMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [updateOrderToDeliverMutation, { isLoading: updateOrderToDeliverLoading }] =
    useUpdateOrderToDeliverMutation();

  useEffect(() => {
    if (!paypalError && !paypalLoading && paypal?.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: DISPATCH_ACTION.RESET_OPTIONS,
          value: { clientId: paypal.clientId, currency: "USD" },
        });

        paypalDispatch({
          type: DISPATCH_ACTION.LOADING_STATUS,
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };

      if (order && !order.isPaid) if (!window.paypal) loadPaypalScript();
    }
  }, [order, paypal?.clientId, paypalError, paypalLoading, paypalDispatch]);

  const onApprove: PayPalButtonsComponentProps["onApprove"] = (data, actions) => {
    return actions.order!.capture().then(async (details) => {
      try {
        await updateOrderToPaidMutation({ orderId: orderId!, details });
        orderRefetch();
        toast.success("Payment successful!", {
          onClick: () => navigate("/profile"),
          position: "top-center",
          style: { cursor: "pointer" },
        });
      } catch (err: any) {
        toast.error(err?.data?.message || err.error, { position: "top-center" });
      }
    });
  };

  const onApproveTest = async () => {
    const details = { payer: { email_address: "rezaeig22@gmail.com" } };
    await updateOrderToPaidMutation({ orderId: orderId!, details });
    orderRefetch();
    toast.success("Payment successful!", {
      onClick: () => navigate("/profile"),
      position: "top-center",
      style: { cursor: "pointer" },
    });
  };

  const createOrder: PayPalButtonsComponentProps["createOrder"] = (data, actions) => {
    return actions.order
      .create({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: order!.totalPrice.toString(),
            },
          },
        ],
      })
      .then((orderId) => orderId);
  };

  const deliverOrderHandler = async () => {
    try {
      await updateOrderToDeliverMutation(orderId!);
      orderRefetch();
      toast.success("Order has been delivered", {
        onClick: () => navigate("/admin/order-list"),
        position: "top-center",
        style: { cursor: "pointer" },
      });
    } catch (err: any) {
      toast.error(err?.data?.message || err.error, { position: "top-center" });
    }
  };

  const onError: PayPalButtonsComponentProps["onError"] = (err) => {
    if (err instanceof Error) toast.error(err.message, { position: "top-center" });
  };

  if (orderLoading) return <Loader />;
  if (orderError) return;
  if (!order) return;

  return (
    <>
      <Row>
        {/* LEFT */}
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
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              <p>
                <strong className="me-1">Order at:</strong>
                {moment(order.createdAt).format("dddd - MMMM Do YYYY - h:mm a")}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on: {moment(order.deliveredAt!).format("dddd - MMMM Do YYYY - h:mm a")}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered!</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on: {moment(order.paidAt!).format("dddd - MMMM Do YYYY - h:mm a")}
                </Message>
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

        {/* RIGHT */}
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

              {/* MARK AS PAID */}
              {!order?.isPaid && (
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
                        {updateOrderToPaidLoading && <Spinner size="sm" className="ms-2" />}
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

              {/* MARK AS DELIVERED */}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item className="text-center">
                  <Button
                    type="button"
                    className="btn text-white px-5"
                    variant="success"
                    onClick={deliverOrderHandler}
                  >
                    Mark as Delivered
                    {updateOrderToDeliverLoading && <Spinner size="sm" className="ms-2" />}
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
