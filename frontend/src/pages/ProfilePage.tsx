import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "../app/store";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useUpdateProfileMutation } from "../api/users-api";
import { toast } from "react-toastify";
import { setCredentials } from "../app/auth-slice";

const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [updateProfileMutation, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setValue("name", userInfo.name);
      setValue("email", userInfo.email);
    }
  }, [userInfo, setValue]);

  const submitHandler = async (data: any) => {
    if (data.password !== data.confirmPassword)
      return toast.error("Passwords do not match!", { position: "top-center" });

    try {
      const res = await updateProfileMutation({
        _id: userInfo!._id,
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }).unwrap();

      dispatch(setCredentials(res));

      toast.success("Profile updated successfully!", { position: "top-center" });
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error, { position: "top-center" });
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-danger">Name is required</span>}
          </Form.Group>

          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-danger">Email is required</span>}
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your confirm password"
              {...register("confirmPassword")}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="px-5 my-3">
            Update
            {updateProfileLoading && <Spinner size="sm" className="ms-1" />}
          </Button>
        </Form>
      </Col>

      <Col md={9}>column</Col>
    </Row>
  );
};

export default ProfilePage;
