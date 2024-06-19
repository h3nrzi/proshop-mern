import { model, Schema } from "mongoose";

interface Review {
  user: typeof Schema.Types.ObjectId;
  name: string;
  rating: number;
  comment: string;
}

interface Product {
  user: typeof Schema.Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: Review[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  addReview(review: Review): Promise<void>;
}

const reviewSchema = new Schema<Review>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new Schema<Product>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

productSchema.methods.addReview = async function (this: Product, review: Review) {
  const alreadyReviewed = this.reviews.some((r) => r.user.toString() === review.user.toString());

  if (alreadyReviewed) {
    throw new Error("Product already reviewed");
  }

  this.reviews.push(review);
  this.numReviews = this.reviews.length;
  this.rating = this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.numReviews;
};

const Product = model<Product>("Product", productSchema);

export default Product;
