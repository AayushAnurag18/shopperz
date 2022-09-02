import db from "../../../lib/mongodb";
const handler = async (req, res) => {
  const database = db.getDatabase();
  const products = database.collection("products");
  const total = await products.count();
  const result = await products.find({}).toArray();
  res.status(200).json({ result, total });
};

export default handler;
