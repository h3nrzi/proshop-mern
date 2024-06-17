export default interface CreateProductDto {
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  numReviews: number;
  description: string;
}
