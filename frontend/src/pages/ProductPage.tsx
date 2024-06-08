import { useState } from "react";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProductQuery } from "../api/products-api";
import { addToCart } from "../app/cart-slice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

const ProductPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductQuery(id!);
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) return <Loader />;
  // @ts-expect-error
  if (error) return <Message variant="danger">{error.data?.message || error.error}</Message>;
  if (!product) return;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to your cart", {
      onClick: () => navigate("/cart"),
      position: "top-center",
      style: { cursor: "pointer" },
    });
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go To Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid rounded />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>

                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>

                  <Col>
                    <strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity</Col>

                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(+e.currentTarget.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((i) => (
                          <option value={i + 1} key={i + 1} className="text-center">
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item className="text-center">
                <Button
                  className="px-5 text-white"
                  type="button"
                  variant="success"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductPage;
