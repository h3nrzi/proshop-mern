import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../api/products-api";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ProductListPage = () => {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery();

  const deleteHandler = (_id: string) => {
    console.log(_id);
  };

  if (productsLoading) return <Loader />;
  if (productsError) return <Message>Something failed!</Message>;

  return (
    <>
      <Row className="align-items-center mb-5">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3 px-2 py-1 text-center">Create New Product</Button>
        </Col>
      </Row>

      <Table striped responsive bordered className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <Link to={`/admin/product/${product._id}/edit`}>
                  <Button variant="info" className="btn-sm text-white">
                    <FaEdit size={20} />
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="btn-sm ms-1"
                  onClick={() => deleteHandler(product._id)}
                >
                  <FaTrash size={15} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductListPage;
