import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getProductReview,
  getTopProducts,
  getSellersProducts,
  createProductSeller,
  SellerDeleteProduct,
  SellerUpdateProduct,
} from "../controllers/productController.js";
import { protect, admin, seller } from "../middleware/authMiddleware.js";

router.route("/:id/reviews").post(protect, createProductReview);
router.route("/reviews").get(getProductReview);
router.get("/top", getTopProducts);

//? Admin

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

//? Seller

router.route("/seller/products").get(protect, getSellersProducts);
router.route("/productSeller").post(protect, createProductSeller);
router
  .route("/seller/:id")
  .delete(protect, SellerDeleteProduct)
  .put(protect, seller, SellerUpdateProduct);

export default router;
