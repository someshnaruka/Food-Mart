//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const session = require("express-session");
const passport = require("passport");
// const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passportLocalMongoose = require("passport-local-mongoose");
// const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const findOrCreate = require("mongoose-findorcreate");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
const multer=require("multer");
const fs = require('fs');
const MongoStore = require('connect-mongo');
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND,
    methods: ["Get", "Post", "Delete"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
const Port = process.env.Port || 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
app.use("/uploads",express.static("uploads"));
app.use(
  session({
    name: "google cookie",
    secret: process.env.COOKIESECRET,
    resave: false,
    saveUninitialized: false, //to inplemnt login sessions,reduce storage size
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URL,
    collectionName:"sessions",
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native'}),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(cookieParser())

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  // await mongoose.connect("mongodb://127.0.0.1:27017/foodUserdb");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  profilePic: String,
  googleId: String,
});

//  usersSchema.plugin(passportLocalMongoose);
usersSchema.plugin(findOrCreate);
const categoryNamesSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
  },
  { collection: "categoryNames" }
); // to connect moongoose to already exisitng schema

const productsSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  price: String,
  quantity: String,
  description: String,
  rating: String,
});

const User = mongoose.model("User", usersSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
// passport.use(User.createStrategy());

const Category = mongoose.model("Category", categoryNamesSchema);

const Product = mongoose.model("Product", productsSchema);

// Product.updateMany({},{$set:{rating:"5"}},{upsert:false,multi:true}).then(()=>{
//     console.log("success");
// }).catch((err)=>{
//     console.log(err);
// });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ClIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.REACT_APP_SERVER_DOMAIN}/auth/google/callback`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo", //used to protect from google plus depreciation now wont pull data from google plus but from userinfo
    
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);

      User.findOrCreate(
        {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          username: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user.id);
  });
});

passport.deserializeUser(function (id, cb) {
  User.findById(id)
    .then((user) => {
      return cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
});


//Multer config

//img storage path
const imgconfig=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./uploads")
  },
  filename:(req,file,cb)=>{
  
    cb(null,`image-${Date.now()}.${file.originalname}`)

  }
})

//img filter

const isImage=(req,file,cb)=>{
  if(file.mimetype.include("image")){
    cb(null,true)
  }
  else{
    cb(new err("Only images allowed"))
  }
};

const upload=multer({
  storage:imgconfig,
  // fileFilter:isImage,
})

app.get("/", (req, res) => {
  res.send("server running");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND}/login`,
    successRedirect: process.env.FRONTEND,
    failureMessage: "Error loging in try again",
  })
);
app.get("/auth/user", (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.send({ message: "Succefully logged in", result: req.user });
  } else {
    console.log("no user found");
  }
});
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.FRONTEND);
  });
});
app.get("/category", (req, res) => {
  Category.find()
    .then((data) => {
      //   console.log(data);
      res.send({ categoryResult: data });
    })
    .catch((err) => {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
    });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const { email } = req.body; //extract email from recieved data from frontend
  User.findOne({ username: email }).then((data) => {
    if (data == null) {
      const hash = bcrypt.hashSync(req.body.password, saltRounds);
      //bycrpt algo
      const username = req.body.email;
      const password = hash; //turned paswd into a hash
      const newUser = new User({
        username: username,
        password: password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePic: req.body.profilePic,
      });
      newUser
        .save()
        .then(() => {
          res.send({ message: "Successfully Signed up", alert: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.send({ message: "Email id is already register", alert: false });
    }
  });
});

app.get("/login", (req, res) => {
  console.log(req.headers.xtoken, "session user");
  const token = req.headers.xtoken;
  if (token) {
    const decoded = jwt.verify(token, process.env.COOKIESECRET);
    res.send({ alert: true, result: decoded });
  } else {
    res.send({ alert: false, message: "invalid token" });
  }
});
app.post("/login", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(req.body);
  User.findOne({ username: user.username }).then((data) => {
    if (!data) {
      res.send({ message: "User not registered" });
    } else {
      bcrypt.compare(user.password, data.password, (err, result) => {
        if (result) {
          const dataSend = {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            profilePic: data.profilePic,
          };
          const token = jwt.sign(dataSend, "my secrent key");
          //   req.session.user=dataSend;
          console.log(token, "session user from post");
          res.send({
            message: "Logged in succesfully",
            alert: true,
            result: token,
          });
        } else {
          res.send({ message: "Wrong password" });
        }
      });
    }
  });
});

app.post("/newProduct",upload.single("image"), (req, res) => {
    console.log(req.body, " Product data from frontend");
  const { title } = req.body;
const {filename}=req.file;
console.log(req.file);
  
  Product.findOne({ title: title })
    .then((data) => {
      if (data) {
        res.send({
          message: "Product already exists",
          alert: false,
          dataRes: data,
        });
      } else {
        const productData={
          title: req.body.title,
          category: req.body.category,
          image: filename,
          price: req.body.price,
          quantity:req.body.quantity,
          description: req.body.description,
          rating: req.body.rating,
        }
        const newProduct = new Product(productData);
        newProduct.save();
        res.send({ message: "Prduct added to database", alert: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.productData.map((items) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: items.title,
          },
          unit_amount: items.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
        quantity: items.unit,
      };
    }),

    mode: "payment",
    billing_address_collection: "auto",
    shipping_options: [{ shipping_rate: "shr_1NVx0QSFjpIBhKyL81OyrH4X" }],
    success_url: process.env.FRONTEND + "/success",
    cancel_url: process.env.FRONTEND + "/cart",
  });

  res.send({ url: session.url });
});

app.get("/newProduct", (req, res) => {
  Product.find().then((data) => {
    // console.log(data);
    res.send({ dataRes: data });
  });
});

app.listen(Port, () => {
  console.log("server running on port" + Port);
});
