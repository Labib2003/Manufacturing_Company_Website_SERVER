const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.436gp.mongodb.net/tool-manufacturer-database?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);

const connectToDb = async () => {
  await mongoose
    .connect(uri)
    .then(mongoose.connection)
    .then(console.log("Database connection successful."))
    .catch((err) => console.log(err));
};

module.exports = connectToDb;
