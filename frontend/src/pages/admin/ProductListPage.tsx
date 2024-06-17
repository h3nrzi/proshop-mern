import _ from "lodash";
import { useState } from "react";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../api/products-api";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ReusableModal, { FooterButton } from "../../components/ReusableModal";

const ProductListPage = () => {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch: productsRefetch,
  } = useGetProductsQuery();

  const [createProductMutation, { isLoading: createProductLoading }] = useCreateProductMutation();

  const [deleteProductMutation, { isLoading: deleteProductLoading }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    try {
      await createProductMutation();
      productsRefetch();
      toast.success("Product created successfully!", { position: "top-center" });
      closeModalHandler();
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error, { position: "top-center" });
      closeModalHandler();
    }
  };

  const deleteProductHandler = async (id: string) => {
    if (window.confirm("Are you sure you want to delete")) {
      try {
        const res = await deleteProductMutation(id).unwrap();
        productsRefetch();
        toast.success(res.message, { position: "top-center" });
      } catch (err: any) {
        toast.error(err?.data?.message || err.error, { position: "top-center" });
      }
    }
  };

  // Reusable Modal
  const [showModal, setShowModal] = useState(false);
  const closeModalHandler = () => setShowModal(!showModal);
  const showModalHandler = () => setShowModal(!showModal);
  const createProductButtons: FooterButton[] = [
    { label: "Ok", onCreate: createProductHandler, variant: "primary" },
  ];

  if (productsLoading) return <Loader />;
  if (deleteProductLoading) return <Loader />;
  if (productsError) return <Message>Something failed!</Message>;

  return (
    <>
      <Row className="align-items-center mb-5">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3 px-2 py-1 text-center" onClick={showModalHandler}>
            Create New Product {createProductLoading && <Spinner size="sm" className="me-1" />}
          </Button>
          <ReusableModal
            showModal={showModal}
            closeModalHandler={closeModalHandler}
            title="Create New Product"
            body="Are you sure you want to create a new product?"
            footerButtons={createProductButtons}
          />
        </Col>
      </Row>

      <Table responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>COUNT</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{<Link to={`/product/${product._id}`}>{_.takeRight(product._id, 4)}</Link>}</td>
              <td>{product.name}</td>
              <td>{product.price ? `$${product.price}` : ``}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.countInStock}</td>
              <td>
                <Link to={`/admin/product/${product._id}/edit`}>
                  <Button variant="info" className="btn-sm text-white">
                    <FaEdit size={20} />
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="btn-sm ms-1"
                  onClick={() => deleteProductHandler(product._id)}
                >
                  <FaTrash size={15} color="white" />
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