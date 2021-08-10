import "./App.css";
import { Name } from "./components/name";
import { PlayButton } from "./components/playButton";
import { Greeting } from "./components/greeting";
import { useState } from "react";
function App() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("secondary");
  const [editName, setEditName] = useState(false);

  function onNameChanged(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function onPlayClicked() {
    setColor("warning");
  }

  return (
    <>
      <div className="name-section">
        <h2>Click the Fox! Game</h2>        
        <Greeting
          value={name}
          active={editName}
          hidden= {color!== "warning"}
          doubleClicked={() => setEditName(true)}
          focusChanged={() => setEditName(false)}
          valueChanged={(name: string) => setName(name)}
        />
        <Name
          hidden={color === "warning"}
          value={name}
          nameChanged={onNameChanged}
        />
        <PlayButton
          clicked={onPlayClicked}
          color={color}
          disabled={name === ""}
        />
      </div>
    </>
  );
}

export default App;
