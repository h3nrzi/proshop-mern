import { useEffect } from "react";
import { Button, Form, Spinner, Stack } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserQuery, useUpdateUserMutation } from "../../api/users-api";
import { setCredentials } from "../../app/auth-slice";
import { RootState } from "../../app/store";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getErrorMessage } from "../../utils/getErrorMessage";

interface FormData {
  _id: string;
  name: string;
  email: string;
  isAdmin: string | boolean;
}

const UserEditPage = () => {
  const { id: userId } = useParams();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm<FormData>();

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useGetUserQuery(userId!);

  const [updateUserMutation, { isLoading: updateUserLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setValue("_id", user._id);
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("isAdmin", user.isAdmin ? "true" : "false");
    }
  }, [user, setValue]);

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    try {
      const updatedUser = await updateUserMutation({
        userId: userId!,
        data: {
          ...data,
          isAdmin: data.isAdmin === "true" ? true : false,
        },
      }).unwrap();

      if (userInfo?._id === updatedUser._id) dispatch(setCredentials(updatedUser));

      userRefetch();

      toast.success("User updated successfully", { position: "top-center" });

      navigate("/admin/user-list");
    } catch (err: any) {
      toast.error(err.message, { position: "top-center" });
    }
  };

  if (userLoading) return <Loader />;
  if (userError) return <Message variant="danger">{getErrorMessage(userError)}</Message>;

  return (
    <>
      <Link to="/admin/user-list" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>

        <Form onSubmit={handleSubmit(submitHandler)}>
          <Stack gap={4} direction="vertical">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" {...register("name")} />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" {...register("email")} />
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Label>Admin</Form.Label>
              <Stack direction="horizontal" gap={3}>
                <Form.Check type="radio" label="Yes" value="true" {...register("isAdmin")} />
                <Form.Check type="radio" label="No" value="false" {...register("isAdmin")} />
              </Stack>
            </Form.Group>

            <Button type="submit" variant="secondary" className="text-white">
              Update {updateUserLoading && <Spinner size="sm" />}
            </Button>
          </Stack>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditPage;
