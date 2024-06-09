import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { toast } from "react-toastify";
import { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Col, Row } from "react-bootstrap";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const paymentMethod = useSelector((state: RootState) => state.cart.paymentMethod);

  useEffect(() => {
    if (!paymentMethod) {
      toast.warn("Please enter a payment method!");
      navigate("/payment");
    }
  }, [navigate, paymentMethod]);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>Column</Col>
        <Col md={4}>Column</Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
