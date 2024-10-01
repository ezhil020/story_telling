import React, { useState } from "react";

function Homepage({ startStory }) {
  const [name, setName] = useState("");

  const handleStart = () => {
    if (name.trim()) {
      startStory(name);
    }
  };

  return (
    <div className="homepage">
      <h1>The Quest for the Lost Treasure</h1>
      <input
        type="text"
        placeholder="Enter your character's name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleStart}>Start Adventure</button>
    </div>
  );
}

export default Homepage;