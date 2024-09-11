import { useCallback, useState } from "react";
import "./App.css";
import NoPAT from "./NoPAT";
import Names from "./Names";

function App() {
  const [pat, setPat] = useState("");
  const [repoNames, setRepoNames] = useState([""]);
  const [collaboratorNames, setCollaboratorNames] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const onStartTask = (e) => {
    e.preventDefault();
    if (!pat || !repoNames.length) return;
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="header">
        <label htmlFor="pat">PAT Token:</label>
        <input
          id="pat"
          type="text"
          value={pat}
          onChange={(e) => setPat(e.target.value)}
        />
      </header>
      {!pat ? (
        <NoPAT />
      ) : (
        <form
          className="form"
          onSubmit={onStartTask}>
          <Names
            names={repoNames}
            setNames={setRepoNames}
          />
          <Names
            names={collaboratorNames}
            setNames={setCollaboratorNames}
          />
          <aside>
            <button type="submit">Create</button>
          </aside>
        </form>
      )}
    </>
  );
}

export default App;
