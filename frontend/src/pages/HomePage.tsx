import { Col, Row } from "react-bootstrap";
import { useGetProductsQuery } from "../api/product-api";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <h2>Loading...</h2>;
  // @ts-expect-error
  if (error) return <div>{error.data?.message || error.error}</div>;
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
