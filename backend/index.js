const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const fs = require("fs");
const path = require("path");
const NewsModel = require("./models/NewsModel");
dotenv.config();

// express json parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', `${req.get('origin')}`);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
// });

// const corsConfig = {
//     origin: true,
//     credentials: true,
// };

// app.use(cors(corsConfig));
// app.options('*', cors(corsConfig));

// app.use((req, res, next) => {
//     cors({
//         // origin: "*",
//         origin: `${req.get('origin')}`,
//         // origin: ["http://localhost:3000", "http://10.13.1.63:3000", `${req.get('origin')}`],
//         methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
//         credentials: true
//     })
//     next();
// })

app.use(
  cors({
    // origin: "*",
    origin: [
      "http://localhost:3000",
      "http://10.13.1.63:3000",
      "http://192.168.1.2:3000",
    ],
    // origin: "http://10.13.1.63:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);

// app.use(cors());
// app.use(function (req, res, next) {
// res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//     );
// })

// configuring session!
const sessionStore = new MongoStore({
  // use existing mongoDB connection
  mongoUrl: "mongodb://localhost:27017/Pemeriksaan",
  collection: "sessions",
});

app.use(
  session({
    name: "bruhMoment",
    secret: "loder kotong",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    rolling: true,
    cookie: {
      // only use cookie for https
      secure: false,
      //
      // sameSite: 'strict',
      // reset cookie duration when session is invoked
      rolling: true,
      //
      // httpOnly: false,

      // if browser is closed, delete the cookie
      ephemeral: true,

      // cookie productive duration
      maxAge: 1000 * 3600,
    },
  })
);

// middleware for serving static files
app.use(
  "/static/profile",
  express.static(path.join(__dirname, "static/profile"))
);

app.get("/", (req, res) => {
  res.send("anjenglah!");
});

// main endpoint
// bruh 0 accessed in the very beginning when total amount is necessary in the client
// bruh is accessed in each load more request
app.get("/bruh", async (req, res) => {
  if (req.query.startingPoint) {
    const limit = 6;
    const startFrom = parseInt(req.query.startingPoint);
    // const startFrom = req.query.startingPoint
    // console.log(startFrom)
    try {
      // get total news total number
      const resultante = await NewsModel.find({})
        .sort({ _id: -1 })
        .skip(startFrom)
        .limit(limit);
      res.status(200).json({ result: resultante });
    } catch (error) {
      console.log(error);
    }
  } else if (!req.query.startingPoint) {
    res.status(404).send("payload doesnt exist");
  }
});
app.get("/bruh0", async (req, res) => {
  if (req.query.startingPoint) {
    const limit = 6;
    const startFrom = parseInt(req.query.startingPoint);
    // const startFrom = req.query.startingPoint
    // console.log(startFrom)
    try {
      // get total news total number
      let totalNum = await NewsModel.find().count();
      const result = await NewsModel.find({})
        .sort({ _id: -1 })
        .skip(startFrom)
        .limit(limit);
      res.status(200).json({ result: result, newsPopulation: totalNum });
    } catch (error) {
      console.log(error);
    }
  } else if (!req.query.startingPoint) {
    res.status(404).send("payload doesnt exist");
  }
});

app.get("/news/:name", (req, res) => {
  fileName = req.params.name;
  const filePath = `./public/${fileName}.pdf`;
  // const filePath = `./public/20.txt`
  const bool = fs.existsSync(filePath);

  if (bool) {
    var file = fs.createReadStream(`./public/${fileName}.pdf`);
    var stat = fs.statSync(`./public/${fileName}.pdf`);
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.txt`
    );
    file.pipe(res);
  } else {
    return res.status(404).json({ message: "file is not available!" });
  }
  // try {
  //     if (fs.existsSync(filePath)) {
  //         console.log(existSync(filePath))
  //         return res.status(200).send('file exists!')
  //         // var file = fs.createReadStream(`./public/${fileName}.pdf`);
  //         // file.on('error', (err) => {
  //         //     console.log('bruh moment', err)
  //         //     return res.status(404).json({ message: 'file is yet to be available!' })
  //         // })
  //         // var stat = fs.statSync(`./public/${fileName}.pdf`);
  //         // res.setHeader('Content-Length', stat.size);
  //         // res.setHeader('Content-Type', 'application/pdf');
  //         // res.setHeader('Content-Disposition', `attachment; filename=${fileName}.txt`);
  //         // file.pipe(res);
  //     }
  // } catch (err) {
  //     console.error(err)
  //     return res.status(404).json({ message: 'file is not available!' })
  // }
});

// IMPORT ROUTER
// http://localhost:2000/api/pemeriksaan
const pemeriksaanRoute = require("./routes/pemeriksaanRoute.js");
const userAPI = require("./routes/UserAPI.js");
const cetak = require("./routes/cetak");
const downloadXls = require("./routes/xlsx");
const masterfile = require("./routes/masterfile.js");
//USE ROUTER
app.use("/api/pemeriksaan", pemeriksaanRoute);
app.use("/api/user", userAPI);
app.use("/api/cetak", cetak);
app.use("/api/xlsx", downloadXls);
app.use("/api/masterfile", masterfile);

mongoose
  .connect("mongodb://localhost:27017/Pemeriksaan", {
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => console.log("connected to PemeriksaanDB!"))
  .catch((err) => {
    console.log("DB failed to connect!");
    err.message = {
      title: "database error",
      desc: "contact the server administrator!",
    };
  });

// SESSION

// create Store in DB : // route/userAPI

const PORT = 2000;
app.listen(PORT, () =>
  console.log(`connected to port http://localhost:${PORT}`)
);
