import _ from "lodash";
import { Button, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../api/users-api";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getErrorMessage } from "../../utils/getErrorMessage";

const UserListPage = () => {
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
    refetch: usersRefetch,
  } = useGetUsersQuery();

  if (usersLoading) return <Loader />;
  if (usersError) return <Message variant="danger">{getErrorMessage(usersError)}</Message>;

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
                      {_.takeRight(user._id.split(""), 4).join("")}
                    </Link>
                  </td>
                  <td>{user.name}</td>
                  <td>{<a href={`mailto:${user.email}`}>{user.email}</a>}</td>
                  <td>{user.isAdmin ? <FaCheck color="green" /> : <FaTimes color="red" />}</td>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <Button variant="info" className="btn-sm text-white">
                        <FaEdit size={20} />
                      </Button>
                    </Link>
                    <Button variant="danger" className="btn-sm ms-1" onClick={() => {}}>
                      <FaTrash size={15} color="white" />
                    </Button>
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
