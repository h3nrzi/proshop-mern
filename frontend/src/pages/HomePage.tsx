import { Col, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useGetAllProductQuery } from "../api/products-api";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCard from "../components/ProductCard";
import { getErrorMessage } from "../utils/getErrorMessage";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("q") || "";

  const { data, isLoading, error, isFetching } = useGetAllProductQuery({ pageNumber, keyword });

  if (isLoading) return <Loader />;
  if (isFetching) return <Loader />;
  if (error) return <Message>{getErrorMessage(error)}</Message>;
  if (!data) return;
  if (pageNumber > data.pages) navigate(`?page=${data.pages}`);

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
