import React, { useState } from "react";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in!");
      return;
    }

    if (!title || !load || !reps) {
      setError("required parameters!");
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(workout),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyField);
      console.log(error);
    }

    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setEmptyFields([]);
      console.log("new workout added!");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label htmlFor="title">Excersize Title:</label>
      <input
        type="text"
        id="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className={emptyFields.includes("title") ? "error" : ""}
        value={title}
      />

      <label htmlFor="load">Load (in kg)</label>
      <input
        type="text"
        id="load"
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        className={emptyFields.includes("load") ? "error" : ""}
        value={load}
      />

      <label htmlFor="reqs">Reps:</label>
      <input
        type="number"
        id="reqs"
        onChange={(e) => {
          setReps(e.target.value);
        }}
        className={emptyFields.includes("reqs") ? "error" : ""}
        value={reps}
      />

      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
