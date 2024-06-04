import { Col, Row } from "react-bootstrap";
import { useGetProductsQuery } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <Loader />;
  // @ts-expect-error
  if (error) return <Message variant="danger">{error.data?.message || error.error}</Message>;
  if (!products) return;

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
