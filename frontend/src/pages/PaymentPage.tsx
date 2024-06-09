import { FormEvent, useEffect, useRef } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { savePaymentMethod } from "../app/cart-slice";
import { RootState } from "../app/store";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

const PaymentPage = () => {
  const paymentMethodRef = useRef<HTMLInputElement>(null);

  const shippingAddress = useSelector((state: RootState) => state.cart.shippingAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
      toast.warn("Please fill out the shipping address", { position: "top-center" });
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodRef.current?.value));
    navigate("/placeholder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              id="PayPal"
              required
              value="PayPal"
              name="paymentMethod"
              ref={paymentMethodRef}
            />
            <Button type="submit" variant="primary" className="mt-2 w-25">
              Continue
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
