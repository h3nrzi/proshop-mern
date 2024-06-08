import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import ShippingAddress from "../entities/ShippingAddress";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { saveShippingAddress } from "../app/cart-slice";
import CheckoutSteps from "../components/CheckoutSteps";

type FormData = ShippingAddress;

const ShippingPage = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const shippingAddress = useSelector((rootState: RootState) => rootState.cart.shippingAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
