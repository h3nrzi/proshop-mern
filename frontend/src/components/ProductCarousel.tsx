import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../api/products-api";
import { getErrorMessage } from "../utils/getErrorMessage";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{getErrorMessage(error)}</Message>;

  return (
    <Carousel pause="hover" className="bg-secondary mb-5 rounded overflow-hidden">
      {products?.map((p) => (
        <Carousel.Item key={p._id}>
          <Link to={`/product/${p._id}`}>
            <Image src={p.image} alt={p.name} />
            <Carousel.Caption className="pb-4">
              <span className="fs-2">{p.name}</span>
              <span className="ms-3 fs-2 text-danger">${p.price}</span>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
