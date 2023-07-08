import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [workout, setWorkout] = useState(null);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/api/workouts/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setWorkout(json);
        setTitle(json.title);
        setLoad(json.load);
        setReps(json.reps);
      }
    };

    if (user) {
      fetchWorkout();
    }
  }, [id, user]);

  if (!workout) {
    return <p>Loading ...</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in!");
      return;
    }

    const updatedWorkout = { title, load, reps };

    const response = await fetch("/api/workouts/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedWorkout),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log(error);
    }

    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      console.log("Update workout added!");
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
      navigate("/");
    }
  };

  return (
    <form className="create" onSubmit={handleUpdate}>
      <h3>Update</h3>

      <label htmlFor="title">Excersize Title:</label>
      <input
        type="text"
        id="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />

      <label htmlFor="load">Load (in kg)</label>
      <input
        type="text"
        id="load"
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        value={load}
      />

      <label htmlFor="reqs">Reps:</label>
      <input
        type="number"
        id="reqs"
        onChange={(e) => {
          setReps(e.target.value);
        }}
        value={reps}
      />

      <button>Update workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Update;
