const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();


// require auth for all routes
router.use(requireAuth);

// GET all workouts
router.get("/", getWorkouts);

// GET a single workout
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

// DELEETE a workout
router.delete("/:id", deleteWorkout);

module.exports = router;
