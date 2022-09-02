import { ObjectId } from "mongodb";
import db from "../../../lib/mongodb";

const handler = async (req, res) => {
  try {
    const productid = ObjectId(req.query.productid);

    const database = db.getDatabase();
    const products = database.collection("products");
    const result = await products.findOne(productid);

    if (!result)
      return res.status(404).json({ message: "Product Not Found!!" });

    res.status(200).json(result);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

export default handler;
