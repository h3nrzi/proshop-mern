import { Fragment, useState } from "react";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateProductReviewMutation, useGetProductQuery } from "../api/products-api";
import { addToCart } from "../app/cart-slice";
import { RootState } from "../app/store";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { getErrorMessage } from "../utils/getErrorMessage";

const ProductPage = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch: productRefetch,
  } = useGetProductQuery(productId!);

  const [createProductReviewMutation, { isLoading: createProductReviewLoading }] =
    useCreateProductReviewMutation();

  //////////////

  if (productLoading) return <Loader />;
  if (productError) return <Message>{getErrorMessage(productError)}</Message>;
  if (!product) return null;

  //////////////

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to your cart", {
      onClick: () => navigate("/cart"),
      position: "top-center",
      style: { cursor: "pointer" },
    });
  };

  /////////////

  return (
    <Fragment>
      <Link to="/" className="btn btn-light my-3">
        Go To Back
      </Link>

      <Fragment>
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

        <Row className="review">
          <Col md={6}>
            <h2>Reviews</h2>
          </Col>
        </Row>
      </Fragment>
    </Fragment>
  );
};

export default ProductPage;
