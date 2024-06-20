import { Fragment, useState } from "react";
import { Button, Card, Col, Form, Image, ListGroup, Row, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
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

interface FormData {
  rating: number;
  comment: string;
}

const ProductPage = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch: productRefetch,
  } = useGetProductQuery(productId!);

  const { register, handleSubmit, setValue } = useForm<FormData>();

  const [createProductReviewMutation, { isLoading: createProductReviewLoading }] =
    useCreateProductReviewMutation();

  //////////////

  if (productLoading) return <Loader />;
  if (productError) return <Message>{getErrorMessage(productError)}</Message>;
  if (!product) return null;

  //////////////

  function addToCartHandler() {
    dispatch(addToCart({ ...product!, qty }));
    toast.success("Added to your cart", {
      onClick: () => navigate("/cart"),
      position: "top-center",
      style: { cursor: "pointer" },
    });
  }

  async function submitHandler(data: FormData) {
    if (!data.rating || !data.comment)
      return toast.error("Please fill out the form", { position: "top-center" });

    try {
      const res = await createProductReviewMutation({ productId: productId!, ...data }).unwrap();
      productRefetch();
      toast.success(res.message, { position: "top-center" });
      setValue("comment", "");
      setValue("rating", 0);
    } catch (err: any) {
      toast.error(err?.data?.message || err.error, { position: "top-center" });
    }
  }

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

        <Row className="review mt-5">
          <Col md={6}>
            {/* SHOW REVIEWS */}
            <h2>Reviews</h2>
            {product.reviews?.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant="flush">
              {product.reviews?.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}

              {/* WRITE REVIEWS */}
              <ListGroup.Item className="p-0 mt-5">
                {userInfo ? (
                  <Form onSubmit={handleSubmit(submitHandler)}>
                    <Form.Group controlId="rating" className="my-2">
                      <Stack className="flex-column flex-md-row align-items-md-start gap-md-2">
                        <h2 className="flex-md-grow-1">Write a Customer Review</h2>
                        <Form.Floating>
                          <Form.Select
                            aria-label="Rating"
                            {...register("rating", { valueAsNumber: true })}
                          >
                            <option value=""></option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Select>
                          <label htmlFor="rating">Rating</label>
                        </Form.Floating>
                      </Stack>
                    </Form.Group>
                    <Form.Group as="fieldset" controlId="comment">
                      <Form.Label as="legend">Comment</Form.Label>
                      <Form.Control as="textarea" rows={5} {...register("comment")} />
                    </Form.Group>
                    <Button
                      type="submit"
                      className="mt-2 w-25"
                      disabled={createProductReviewLoading}
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Fragment>
                    <h2 className="flex-md-grow-1">Write a Customer Review</h2>
                    <Message>
                      Please <Link to={`/login?redirect=${"/product/" + productId}`}>sing in</Link>
                      to write a review
                    </Message>
                  </Fragment>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Fragment>
    </Fragment>
  );
};

export default ProductPage;
