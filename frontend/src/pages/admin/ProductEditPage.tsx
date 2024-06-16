import { useEffect } from "react";
import { Button, Form, Spinner, Stack } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "../../api/products-api";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Product from "../../entities/Product";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { toast } from "react-toastify";

type FormData = Product;

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<FormData>();

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch: productRefetch,
  } = useGetProductQuery(productId!);

  const [updateProductMutation, { isLoading: updateProductLoading }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("image", product.image);
      setValue("brand", product.brand);
      setValue("category", product.category);
      setValue("countInStock", product.countInStock);
      setValue("description", product.description);
    }
  }, [product, setValue]);

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    try {
      await updateProductMutation({ productId: productId!, data });
      productRefetch();
      toast.success("Product updated successfully", { position: "top-center" });
      navigate("/admin/product-list");
    } catch (err: any) {
      toast.error(err.message, { position: "top-center" });
    }
  };

  if (productLoading) return <Loader />;
  if (productError) return <Message variant="danger">{getErrorMessage(productError)}</Message>;

  return (
    <>
      <Link to="/admin/product-list" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Stack gap={4} direction="vertical">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" {...register("name")} />
            </Form.Group>

            {/* IMAGE INPUT PLACEHOLDER */}

            <Stack gap={4} direction="horizontal">
              <Form.Group controlId="category" className="flex-grow-1">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" {...register("category")}>
                  <option value="Electronics">Electronics</option>
                  <option value="Sample Category">Sample Category</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="brand" className="flex-grow-1">
                <Form.Label>Brand</Form.Label>
                <Form.Control as="select" {...register("brand")}>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                </Form.Control>
              </Form.Group>
            </Stack>

            <Stack direction="horizontal" gap={4}>
              <Form.Group controlId="price" className="flex-grow-1">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" min=".00" step=".01" {...register("price")} />
              </Form.Group>
              <Form.Group controlId="countInStock" className="flex-grow-1">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control type="number" min="0" {...register("countInStock")} />
              </Form.Group>
            </Stack>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={5} {...register("description")} />
            </Form.Group>

            <Button type="submit" variant="secondary" className="text-white">
              Update {updateProductLoading && <Spinner size="sm" />}
            </Button>
          </Stack>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
