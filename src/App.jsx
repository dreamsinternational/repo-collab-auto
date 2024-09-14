import { useState } from "react";
import { Octokit } from "@octokit/rest";
import NoPAT from "./NoPAT";
import "./App.css";
import App1 from "./App1";
import App2 from "./App2";

function App() {
  const [pat, setPat] = useState("");
  const [octokit, setOctokit] = useState(null);
  const [page, setPage] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <nav className="nav">
        <a href="#1" onClick={() => setPage("1")}>
          App 1
        </a>
        <a href="#2" onClick={() => setPage("2")}>
          App 2
        </a>
      </nav>
      <header className="header">
        <label htmlFor="pat">PAT Token:</label>
        <input id="pat" type="text" value={pat} onChange={(e) => setPat(e.target.value)} />
        <button onClick={() => setOctokit(new Octokit({ auth: pat })) ?? setPat("")}>Init</button>
      </header>
      {!octokit || isLoading ? (
        <NoPAT />
      ) : (
        <>
          {page === "1" && <App1 octokit={octokit} setIsLoading={setIsLoading} />}
          {page === "2" && <App2 octokit={octokit} setIsLoading={setIsLoading} />}
        </>
      )}
    </>
  );
}

export default App;
