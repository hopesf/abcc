const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

// middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());

mongoose.connect("//", {
  useNewUrlParser: true,
});

const walletModal = require("./models/WalletAssets.js");

app.get("/coinmarket", (req, res) => {
  let response = null;
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        {
          headers: {
            "X-CMC_PRO_API_KEY": "63ea1de6-2596-46e3-9ee1-d4b82a1bc3b1",
          },
        }
      );
    } catch (ex) {
      response = null;
      // error
      res.json(ex);
      reject(ex);
    }
    if (response) {
      // success
      const json = response.data;
      res.json(json.data);
      resolve(json);
    }
  });
});

app.get("/userdata", function (req, res, next) {
  let wallet = mongoose.Types.ObjectId("6256e4246e5c6459eb7962ae");

  walletModal.aggregate(
    [
      {
        $match: {
          WalletId: wallet,
        },
      },
    ],
    (err, data) => {
      console.log(data);
      if (err) {
        res.json(err);
      }
      res.json(data);
    }
  );
});

//listen
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`sunucu dinleniyor, port: ${port}`));
