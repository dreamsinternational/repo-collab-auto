import { useState } from "react";
import { Octokit } from "@octokit/rest";
import NoPAT from "./NoPAT";
import Names from "./Names";
import "./App.css";

function App() {
  const [pat, setPat] = useState("");
  const [token, setToken] = useState("");
  const [repoNames, setRepoNames] = useState([""]);
  const [collaboratorNames, setCollaboratorNames] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const onStartTask = (e) => {
    e.preventDefault();
    if (!token || !repoNames.length) return;
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="header">
        <label htmlFor="pat">PAT Token:</label>
        <input id="pat" type="text" value={pat} onChange={(e) => setPat(e.target.value)} />
        <button>Init</button>
      </header>
      {!token ? (
        <NoPAT />
      ) : (
        <form className="form" onSubmit={onStartTask}>
          <Names names={repoNames} setNames={setRepoNames} />
          <Names names={collaboratorNames} setNames={setCollaboratorNames} />
          <aside>
            <button type="submit">Create</button>
          </aside>
        </form>
      )}
    </>
  );
}

export default App;
