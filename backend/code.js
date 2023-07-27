//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passportLocalMongoose = require("passport-local-mongoose");
// const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["Get", "Post"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
const Port = process.env.Port || 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(
  session({
    secret: "My secret key",
    resave: false,
    saveUninitialized: false,
    secure: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())

main().catch((err) => console.log(err));

async function main() {
  //   await mongoose.connect(process.env.MONGODB_URL);
  await mongoose.connect("mongodb://127.0.0.1:27017/foodUserdb");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true,
  },
  password: String,
  profilePic: String,
});

usersSchema.plugin(passportLocalMongoose);
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
passport.use(User.createStrategy());

// passport.use(
//   new LocalStrategy(function (username, password, done) {
//     User.findOne({ username: username }).then((user)=>{
//         if(!user){
//             return(done(null, false), { message: "Incorrect username", alert: false })
//         }
//         if (bcrypt.compareSync(password, user.password)){
//             return( done(null, false), { message: "incorrect password" })
//          }
//          else{
//             return done(null, user);
//          }
//     }).catch((err)=>{
// console.log(err);
//     })
//   })
// );
// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null,user._id);
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

const Category = mongoose.model("Category", categoryNamesSchema);

const Product = mongoose.model("Product", productsSchema);

// Product.updateMany({},{$set:{rating:"5"}},{upsert:false,multi:true}).then(()=>{
//     console.log("success");
// }).catch((err)=>{
//     console.log(err);
// });

app.get("/", (req, res) => {
  res.send("server running");
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
    // const { email } = req.body; //extract email from recieved data from frontend 
    //  User.findOne({ username: email }).then((data) => {
    //   if (data == null) {
    //     const hash = bcrypt.hashSync(req.body.password, saltRounds);
    //     //bycrpt algo
    //     const username = req.body.email;
    //     const password = hash; //turned paswd into a hash
        // const newUser = new User({
        //   username: username,
        //   password: password,
        //   firstName: req.body.firstName,
        //   lastName: req.body.lastName,
        //   profilePic: req.body.profilePic,
        // });
    //     newUser
    //       .save()
    //       .then(() => {
    //         res.send({ message: "Successfully Signed up", alert: true });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   } else {
    //     res.send({ message: "Email id is already register", alert: false });
    //   }
    // });
    const newUser = new User({
        username: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePic: req.body.profilePic,
      });

  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.send({ message: "error logining in" });
    } else {
      res.send({ message: "Successfully Signed up", alert: true });
    }
  });

  

 
});

app.get("/login",(req,res)=>{
    console.log(req.user,"session user");
    if(req.user){
        res.send({alert:true,result:req.user})
    }
    else{
        res.send({alert:false})
    }
})
app.post("/login", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(req.body);
//   User.findOne({ username: user.username }).then((data) => {
//     if (!data) {
//       res.send({ message: "User not registered" });
//     } else {
//       bcrypt.compare(user.password, data.password, (err, result) => {
//         if (result) {
//           const dataSend = {
//             _id: data._id,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.username,
//             profilePic: data.profilePic,
//           };
//           req.session.user=dataSend;
//           console.log(req.session.user,"session user from post");
//           res.send({
//             message: "Logged in succesfully",
//             alert: true,
//             result: dataSend,
//           });
//         }
//         else{
//             res.send({message:"Wrong password"})
//         }
//       });
//     }
//   });
    req.logIn(user, (err) => {
      if(!user){
          res.send({message:"wrong username or password"})
      }
      if (err) {
        console.log(err);
      } else {
        User.findOne({ username: user.username })
          .then((data) => {
            const dataSend = {
              _id: data._id,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.username,
              profilePic: data.profilePic,
            };
            passport.authenticate("local")(req, res, () => {
              console.log(req.user,"user from post");
              res.send({
                message: "Logged in succesfully",
                alert: true,
                result: dataSend,
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

//   passport.authenticate("local",
//      (err, user, info) =>{
//       if (err) throw err;
//       if (!user) res.send({ message: "No user exist" });
//       else {
//         req.logIn(user, (err) => {
//           if (err) throw err;

//           const dataSend = {
//             _id: data._id,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.email,
//             profilePic: data.profilePic,
//           };
//           console.log(dataSend);
//           res.send({
//             message: "Logged in succesfully",
//             alert: true,
//             result: dataSend,
//           });
//         });
//       }
//     })(req,res,next);
// });

//   const { email, password } = req.body;
//   User.findOne({ email: email })
//     .then((data) => {
//       if (data) {
//         if (data.password === password) {
//           const dataSend = {
//             _id: data._id,
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.email,
//             profilePic: data.profilePic,
//           };
//           console.log(dataSend);
//           res.send({
//             message: "Logged in succesfully",
//             alert: true,
//             result: dataSend,
//           });
//         } else {
//           res.send({ message: "Incorrect Password", alert: false });
//         }
//       } else {
//         res.send({ message: "User not Registered", alert: false });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });

app.post("/newProduct", (req, res) => {
  //   console.log(req.body, "data from frontend");
  const { title } = req.body;
  Product.findOne({ title: title })
    .then((data) => {
      if (data) {
        res.send({
          message: "Product already exists",
          alert: false,
          dataRes: data,
        });
      } else {
        const newProduct = new Product(req.body);
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
