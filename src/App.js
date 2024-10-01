import React, { useState, useEffect } from "react";
import Homepage from "./Homepage";
import StoryScene from "./StoryScene";
import ProgressBar from "./ProgressBar";

function App() {
  const [user, setUser] = useState({
    name: "",
    chapter: "The Quest for the Lost Treasure",
    currentScene: 0,
    progress: 0,
    choices: []
  });

  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const savedProgress = localStorage.getItem("storyProgress");
    if (savedProgress) {
      setUser(JSON.parse(savedProgress));
      setIsStarted(true);
    }
  }, []);

  const startStory = (name) => {
    setUser((prevState) => ({
      ...prevState,
      name,
    }));
    setIsStarted(true);
    localStorage.setItem("storyProgress", JSON.stringify(user));
  };

  const updateProgress = (newScene, newProgress, newChoice) => {
    const updatedChoices = [...user.choices, newChoice];
    setUser((prevState) => ({
      ...prevState,
      currentScene: newScene,
      progress: newProgress,
      choices: updatedChoices,
    }));
    localStorage.setItem(
      "storyProgress",
      JSON.stringify({
        ...user,
        currentScene: newScene,
        progress: newProgress,
        choices: updatedChoices,
      })
    );
  };

  return (
    <div className="App">
      {!isStarted ? (
        <Homepage startStory={startStory} />
      ) : (
        <div>
          <ProgressBar progress={user.progress} />
          <StoryScene user={user} updateProgress={updateProgress} />
        </div>
      )}
    </div>
  );
}

export default App;