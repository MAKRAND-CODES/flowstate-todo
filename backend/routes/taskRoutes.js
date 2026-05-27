/*const express =
  require("express");

const router =
  express.Router();

const auth =
  require(
    "../middleware/authMiddleware"
  );

const {
  createTask,
  getTasks,
} = require(
  "../controllers/taskController"
);

router.post(
  "/",
  auth,
  createTask
);

router.get(
  "/",
  auth,
  getTasks
);

module.exports =
  router;*/

const express =
  require("express");

const router =
  express.Router();

const auth =
  require(
    "../middleware/authMiddleware"
  );

const {
  createTask,
  getTasks,
  completeTask,
} = require(
  "../controllers/taskController"
);

/* ================= CREATE TASK ================= */

router.post(
  "/",
  auth,
  createTask
);

/* ================= GET TASKS ================= */

router.get(
  "/",
  auth,
  getTasks
);

/* ================= COMPLETE TASK ================= */

router.put(
  "/:id/complete",
  auth,
  completeTask
);

module.exports =
  router;

