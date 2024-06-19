import _ from "lodash";
import { Badge, Button, Table } from "react-bootstrap";
import { FaCheck, FaCheckSquare, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteUserMutation, useGetUsersQuery } from "../../api/users-api";
import { RootState } from "../../app/store";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { UserInfo } from "../../entities/Auth";
import { getErrorMessage } from "../../utils/getErrorMessage";

const UserListPage = () => {
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
    refetch: usersRefetch,
  } = useGetUsersQuery();

  const [deleteUserMutation, { isLoading: deleteUserLoading }] = useDeleteUserMutation();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  if (usersLoading) return <Loader />;
  if (deleteUserLoading) return <Loader />;
  if (usersError) return <Message variant="danger">{getErrorMessage(usersError)}</Message>;

  async function deleteUserHandler(id: string) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await deleteUserMutation(id).unwrap();
        usersRefetch();
        toast.success(res.message, { position: "top-center" });
      } catch (err: any) {
        toast.error(err?.data?.message || err.error, { position: "top-center" });
      }
    }
  }

  function getAdminIcon(user: UserInfo) {
    if (user.isAdmin)
      return user.email === "admin@gmail.com" ? (
        <FaCheckSquare color="gold" size="25px" />
      ) : (
        <FaCheck color="green" size="20px" />
      );

    return <FaTimes color="red" size="25px" />;
  }

  return (
    <>
      <h1 className="mb-5">Users</h1>
      {
        <Table responsive className="table-sm mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <Link to={`/admin/user/${user._id}`}>
                      {_.takeRight(user._id?.split(""), 4).join("")}
                    </Link>
                  </td>
                  <td>
                    {user._id === userInfo?._id ? (
                      <Badge className="fs-6">{user.name}</Badge>
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>{<a href={`mailto:${user.email}`}>{user.email}</a>}</td>
                  <td>{getAdminIcon(user)}</td>
                  <td>
                    {user.email === "admin@gmail.com" ? (
                      "-----------"
                    ) : (
                      <>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <Button variant="info" className="btn-sm text-white">
                            <FaEdit size={20} />
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="btn-sm ms-1"
                          onClick={() => deleteUserHandler(user._id!)}
                        >
                          <FaTrash size={15} color="white" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      }
    </>
  );
};

export default UserListPage;
