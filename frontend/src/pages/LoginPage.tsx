import { useEffect } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../api/users-api";
import { setCredentials } from "../app/auth-slice";
import { RootState } from "../app/store";
import FormContainer from "../components/FormContainer";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginMutation, { isLoading }] = useLoginMutation();
  const userInfo = useSelector((rootState: RootState) => rootState.auth.userInfo);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (data: FormData) => {
    try {
      const res = await loginMutation(data).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      // @ts-expect-error
      toast.error(err.data.message || err.error, { position: "top-center" });
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter Your Email..." {...register("email")} />
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Password..."
            {...register("password")}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2 w-25" disabled={isLoading}>
          Sign In
          {isLoading && <Spinner size="sm" className="ms-2" />}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="ms-1">
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
