import _ from "lodash";
import { Button, Table } from "react-bootstrap";
import { FaTimes, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../api/orders-api";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderListPage = () => {
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useGetOrdersQuery();

  if (ordersLoading) return <Loader />;
  if (ordersError) return <Message variant="danger">Something Failed.</Message>;

  return (
    <>
      <h1>Orders</h1>
      {
        <Table responsive className="table-sm mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      {_.takeRight(order._id.split(""), 4).join("")}
                    </Link>
                  </td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt?.substring(0, 10) : <FaTimes color="red" />}</td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt?.substring(0, 10)
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </td>
                  <td>
                    {order.isPaid && order.isDelivered ? (
                      <FaCheck color="green" />
                    ) : (
                      <Link to={`/order/${order._id}`}>
                        <Button size="sm" as="span" variant="secondary" className="text-white">
                          Details
                        </Button>
                      </Link>
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

export default OrderListPage;
