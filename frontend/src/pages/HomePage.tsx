import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Product from "../entities/Product";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>("http://localhost:3000/api/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

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
