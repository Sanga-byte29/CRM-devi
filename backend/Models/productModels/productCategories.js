const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    categoryDescription: { type: String },
    categoryId: { type: String },
  },
  { timestamps: true }
);
CategorySchema.pre("save", function (next) {
  if (!this.categoryId) {
    this.categoryId = `CAT-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
