import { Col, Row } from "react-bootstrap";
import { useGetProductsQuery } from "../api/products-api";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCard from "../components/ProductCard";
import { getErrorMessage } from "../utils/getErrorMessage";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { pageNumber } = useParams();

  const {
    data,
    isLoading: productQueryLoading,
    error: productQueryError,
  } = useGetProductsQuery({ pageNumber: +pageNumber! });

  if (productQueryLoading) return <Loader />;
  if (productQueryError) return <Message>{getErrorMessage(productQueryError)}</Message>;

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {data?.products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
