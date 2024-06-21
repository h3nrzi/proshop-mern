import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

interface FormData {
  keyword: string;
}

const SearchBox = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<FormData>();

  setValue("keyword", keyword || "");

  function submitHandler(data: FormData) {
    if (data.keyword) return navigate(`/search/${data.keyword}`);
    return navigate("/");
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)} className="d-flex">
      <Form.Control
        type="text"
        placeholder="Search products..."
        className="mr-sm-2 ml-sm-5"
        {...register("keyword")}
      />
      <Button type="submit" variant="outline-light" className="p-2 mx-2 text-nowrap">
        <FaSearch /> Search
      </Button>
    </Form>
  );
};

export default SearchBox;
