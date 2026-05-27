/*const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

/* MIDDLEWARE */
//app.use(cors());

//app.use(express.json());

/* TEST ROUTE */
//app.get("/", (req, res) => {

//res.send("FlowState API Running");

//});

/* PORT */
//const PORT =
//process.env.PORT || 5000;

/* SERVER */
//app.listen(PORT, () => {

////console.log(
//`Server running on ${PORT}`
//);

//});
/*const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

//ROUTEs
const authRoutes =
  require("./routes/authRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const app = express();

//DEBUG CHECK
console.log(
  "MONGO URI =>",
  process.env.MONGO_URI
);

//CONNECT DATABASE 
connectDB();

// MIDDLEWARE 
app.use(cors());

app.use(express.json());

// API ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

//HEALTH ROUTE
app.get("/", (req, res) => {

  res.send(
    "FlowState API Running 🚀"
  );

});

//PORT
const PORT =
  process.env.PORT || 5000;

//SERVER START
app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});*/

const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

/* ROUTES */
const authRoutes =
  require("./routes/authRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const app = express();

/* DEBUG CHECK */
console.log(
  "MONGO URI =>",
  process.env.MONGO_URI
);

/* CONNECT DATABASE */
connectDB();

/* MIDDLEWARE */

app.use(

  cors({

    origin: [

      "https://flowstate-todo-3kizpuu04-makrand-codes-projects.vercel.app/"
    ],
    methods: ["GET",
      "POST",
      "PUT",
      "DELETE",
    ],
    credentials: true,

  })

);

app.use(express.json());

/* API ROUTES */
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

/* HEALTH ROUTE */
app.get("/", (req, res) => {

  res.send(
    "FlowState API Running 🚀"
  );

});

/* PORT */
const PORT =
  process.env.PORT || 5000;

/* SERVER START */
app.listen(PORT, () => {

  console.log(
    `Server running on ${PORT}`
  );

});

