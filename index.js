const dotenv = require("dotenv").config();
const app = require("./app");
const connectToDb = require("./utils/connectToDb");

const port = process.env.PORT || 5000;

connectToDb();
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
