const express = require("express");
const app = express();
const port = 5500;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/schema");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var methodOverride = require('method-override')
app.use(methodOverride('_method'))



/// GET Request

app.get("/", (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/edit/:id", (req, res) => {
  User
  .findById(req.params.id)
  .then((result) => {
    res.render("edit" , {arr: result});
  })
  .catch((err) => {
    console.log(err);
  })
  
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.get("/show/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("show" , {arr: result});
    })
    .catch((err) => {
      console.log(err);
    });
});



//delete
app.delete('/index/:id', (req, res) => {
  User
  .findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  })
});


//PUT
app.put('/edit/:id', upload.single("picture") , (req, res) => {
  const updateData = { ...req.body };

  if (req.file) {
    updateData.Picture = req.file.filename;
  }
  User
  .findByIdAndUpdate(req.params.id , updateData)
  .then((result) => {
    res.redirect("/");
    console.log(result);
  }
)
  .catch((err) => {
    console.log(err);
  })
});




mongoose
  .connect(
    "mongodb+srv://yassinwxd0:JyBRbISO8M3GcnUK@cluster0.2kx1ngm.mongodb.net/alldata?appName=Cluster0",
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:5500/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/new", upload.single("picture"), (req, res) => {
  const data = new User({
    ...req.body,
    Picture: req.file ? req.file.filename : "profile-icon.webp" ,
  });
  data
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
