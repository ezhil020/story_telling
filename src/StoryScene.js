import React, { useState, useEffect } from "react";

const scenes = [
  {
    id: 0,
    text: "You step into the Enchanted Forest. What will you do?",
    options: [
      { text: "Follow the Dark Path", nextScene: 1 },
      { text: "Head to the Glimmering Stream", nextScene: 2 },
    ],
  },
  {
    id: 1,
    text: "You encounter a wild boar. What will you do?",
    options: [
      { text: "Scare the Boar", nextScene: 3 },
      { text: "Back Away", nextScene: 4 },
    ],
  },
  {
    id: 2,
    text: "You see a glimmering object in the stream. What will you do?",
    options: [
      { text: "Dive in", nextScene: 5 },
      { text: "Ignore it", nextScene: 6 },
    ],
  },
];

function StoryScene({ user, updateProgress }) {
  const [scene, setScene] = useState(scenes[user.currentScene]);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    setScene(scenes[user.currentScene]);
    setTimeLeft(10);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      handleDefaultDecision();
    }

    return () => clearInterval(timer);
  }, [user.currentScene, timeLeft]);

  const handleDecision = (nextSceneId, choice) => {
    updateProgress(nextSceneId, ((nextSceneId + 1) / scenes.length) * 100, choice);
  };

  const handleDefaultDecision = () => {
    const defaultChoice = scene.options[0];
    handleDecision(defaultChoice.nextScene, defaultChoice.text);
  };

  return (
    <div className="story-scene">
      <h2>{scene.text}</h2>
      <div className="options">
        {scene.options.map((option, index) => (
          <button key={index} onClick={() => handleDecision(option.nextScene, option.text)}>
            {option.text}
          </button>
        ))}
      </div>
      <div className="timer">Time left: {timeLeft}s</div>
    </div>
  );
}

export default StoryScene;