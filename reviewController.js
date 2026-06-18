const db = require("../db");

const createReview = (req, res) => {
  const {
    product_id,
    user_id,
    username,
    rating,
    review_text,
    status
  } = req.body;

  const sql = `
    INSERT INTO Product_Review 
    (product_id, user_id, username, rating, review_text, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [product_id, user_id, username, rating, review_text, status || "Visible"],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error creating review",
          error: err
        });
      }

      res.status(201).json({
        message: "Review created successfully",
        reviewId: result.insertId
      });
    }
  );
};

const getAllReviews = (req, res) => {
  const sql = "SELECT * FROM Product_Review ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching reviews",
        error: err
      });
    }

    res.json(results);
  });
};

const getReviewsByProduct = (req, res) => {
  const { product_id } = req.params;

  const sql = `
    SELECT * FROM Product_Review 
    WHERE product_id = ? 
    ORDER BY created_at DESC
  `;

  db.query(sql, [product_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching product reviews",
        error: err
      });
    }

    res.json(results);
  });
};

const updateReview = (req, res) => {
  const { review_id } = req.params;
  const { username, rating, review_text, status } = req.body;

  const sql = `
    UPDATE Product_Review 
    SET username = ?, rating = ?, review_text = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE review_id = ?
  `;

  db.query(
    sql,
    [username, rating, review_text, status || "Visible", review_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error updating target review node",
          error: err
        });
      }
      res.json({ message: "Review updated successfully" });
    }
  );
};

const deleteReview = (req, res) => {
  const { review_id } = req.params;

  const sql = "DELETE FROM Product_Review WHERE review_id = ?";

  db.query(sql, [review_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error deleting review from database record",
        error: err
      });
    }
    res.json({ message: "Review deleted successfully" });
  });
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  updateReview,
  deleteReview
};