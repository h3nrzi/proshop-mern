import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useGetAllProductQuery } from "../api/products-api";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCard from "../components/ProductCard";
import { getErrorMessage } from "../utils/getErrorMessage";
import Paginate from "../components/Paginate";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();

  console.log(pageNumber, keyword);

  const {
    data,
    isLoading: productQueryLoading,
    error: productQueryError,
  } = useGetAllProductQuery({ pageNumber: +pageNumber!, keyword });

  if (productQueryLoading) return <Loader />;
  if (productQueryError) return <Message>{getErrorMessage(productQueryError)}</Message>;
  if (!data?.products && !data?.pages && !data?.page) return;

  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {data.products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Paginate isAdmin={false} page={data.page} pages={data.pages} keyword={keyword} />
    </Fragment>
  );
};

export default HomePage;
