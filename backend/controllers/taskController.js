/*const Task =
  require("../models/Task");

// CREATE TASK 
exports.createTask =
  async (req, res) => {

    try {

      const task =
        await Task.create({
          ...req.body,
          user: req.user,
        });

      res.status(201).json(
        task
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  };

// GET TASKS 
exports.getTasks =
  async (req, res) => {

    try {

      const tasks =
        await Task.find({
          user: req.user,
        }).sort({
          createdAt: -1,
        });

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  };*/


const Task =
  require("../models/Task");

/* ================= CREATE TASK ================= */

exports.createTask =
  async (req, res) => {

    try {

      const task =
        await Task.create({

          ...req.body,

          user: req.user.id,

        });

      res.status(201).json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };

/* ================= GET TASKS ================= */

exports.getTasks =
  async (req, res) => {

    try {

      const tasks =
        await Task.find({

          user: req.user.id,

          completed: false,

        }).sort({
          createdAt: -1,
        });

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };

/* ================= COMPLETE TASK ================= */

exports.completeTask =
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {

        return res
          .status(404)
          .json({
            message:
              "Task not found",
          });

      }

      task.completed = true;

      await task.save();

      res.json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };
