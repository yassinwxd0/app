const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const Alldata = require("./models/schema");
app.set('view engine', 'ejs');  


app.get("/", (req, res) => {
  res.render("index");
});

mongoose
  .connect(
    "mongodb+srv://yassinwxd0:JyBRbISO8M3GcnUK@cluster0.2kx1ngm.mongodb.net/alldata?appName=Cluster0",
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:3000/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  console.log(req.body);
  const data = new Alldata(req.body);
  data
    .save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/index.html", (req, res) => {
  res.sendFile("./views/res.html", { root: __dirname });
});
