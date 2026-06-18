const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/product/:product_id", getReviewsByProduct);

router.put("/:review_id", updateReview);
router.delete("/:review_id", deleteReview);

module.exports = router;