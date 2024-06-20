import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
  isAdmin: boolean;
  page: number;
  pages: number;
}

const Paginate = ({ pages, page, isAdmin }: Props) => {
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    if (isAdmin) return navigate(`/admin/product-list/page/${pageNumber}`);
    navigate(`/page/${pageNumber}`);
  };

  return (
    pages > 1 && (
      <Pagination>
        {Array.from({ length: pages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === page}
            onClick={() => handlePageChange(i + 1)}
            className="cursor-pointer my-5"
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
