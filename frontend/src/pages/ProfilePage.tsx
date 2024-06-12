import _ from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetMyOrdersQuery } from "../api/orders-api";
import { useUpdateProfileMutation } from "../api/users-api";
import { setCredentials } from "../app/auth-slice";
import { RootState } from "../app/store";
import Loader from "../components/Loader";

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
  const { data: orders, isLoading: myOrdersLoading, error: myOrdersError } = useGetMyOrdersQuery();

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

  if (myOrdersError) return null;

  return (
    <Row>
      <Col md={3}>
        <h2 className="text-center mb-5 bg-primary text-white rounded-1">Profile</h2>
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

      <Col md={9}>
        <h2 className="text-center mb-5 bg-secondary text-white rounded-1">Orders</h2>
        {myOrdersLoading ? (
          <Loader />
        ) : (
          <Table striped responsive bordered className="table-sm mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      {_.takeRight(order._id.split(""), 4).join("")}
                    </Link>
                  </td>
                  <td>{moment(order.createdAt).format("MMMM Do YYYY")}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? moment(order.paidAt).format("MMMM Do YYYY") : <FaTimes />}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      moment(order.deliveredAt).format("MMMM Do YYYY")
                    ) : (
                      <FaTimes />
                    )}
                  </td>
                  <td>
                    {!order.isPaid && (
                      <Button
                        type="button"
                        size="sm"
                        variant="danger"
                        className="text-white"
                        onClick={() => {}}
                      >
                        <FaTrash size="15px" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
