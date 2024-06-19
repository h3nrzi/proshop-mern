import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingAddress } from "../app/cart-slice";
import { RootState } from "../app/store";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";

type FormData = {
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

const ShippingPage = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const shippingAddress = useSelector((state: RootState) => state.cart.shippingAddress);
  const cartItems = useSelector((state: RootState) => state.cart.orderItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      toast.warn("Please pick a product", { position: "top-center" });
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const submitHandler = (data: FormData) => {
    dispatch(saveShippingAddress(data));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address..."
            {...register("address", { value: shippingAddress?.address })}
          />
        </Form.Group>

        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city..."
            {...register("city", { value: shippingAddress?.city })}
          />
        </Form.Group>

        <Form.Group controlId="postalCode" className="my-3">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your postalCode..."
            {...register("postalCode", { value: shippingAddress?.postalCode })}
          />
        </Form.Group>

        <Form.Group controlId="country" className="my-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your country..."
            {...register("country", { value: shippingAddress?.country })}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2 w-25">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
