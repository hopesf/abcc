const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletAssets = new Schema(
  {
    TokenId: {
      type: String,
    },
    WalletId: {
      type: mongoose.Types.ObjectId,
    },
    Quantity: {
      type: Number,
    },
  },
  { collection: "WalletAssets", versionKey: false }
);

module.exports = mongoose.model("WalletAssets", WalletAssets);
