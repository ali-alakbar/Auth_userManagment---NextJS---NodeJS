const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["POST", "GET"],
  })
);

const PORT = process.env.PORT || 8080;
dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECT, { useNewUrlParser: true })
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`Server's running on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("It works!!");
});

app.use("/auth", require("./routes/userRoutes"));
app.use("/edit", require("./routes/favUser"));
