import { useCallback, useState } from "react";
import { Octokit } from "@octokit/rest";
import NoPAT from "./NoPAT";
import Names from "./Names";
import "./App.css";

function App() {
  const [pat, setPat] = useState("");
  const [octokit, setOctokit] = useState(null);
  const [repoNames, setRepoNames] = useState([""]);
  const [collaboratorNames, setCollaboratorNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  const onStartTask = useCallback(
    async (e) => {
      e.preventDefault();
      if (!octokit || !repoNames.length) return;
      setIsLoading(true);
      try {
        for (const repoName of repoNames) {
          const { data: repo } = await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            // auto_init: false,
            private: true,
          });

          repo.collaborators = [];

          for (const collaboratorName of collaboratorNames) {
            const { data: req } = await octokit.repos.addCollaborator({
              owner: repo.owner.login,
              repo: repo.name,
              username: collaboratorName,
              permission: "push", // ['admin', 'push', 'pull']
            });

            repo.collaborators.push(req);
          }

          setRepositories((r) => r.concat(repo));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setRepoNames([""]);
        setCollaboratorNames([]);
      }
    },
    [octokit, repoNames, collaboratorNames]
  );

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
        <button onClick={() => setOctokit(new Octokit({ auth: pat })) ?? setPat("")}>Init</button>
      </header>
      {!octokit || isLoading ? (
        <NoPAT />
      ) : (
        <>
          <form
            className="form"
            onSubmit={onStartTask}>
            <Names
              title="repository"
              names={repoNames}
              setNames={setRepoNames}
            />
            <Names
              title="collaborator"
              names={collaboratorNames}
              setNames={setCollaboratorNames}
            />
            <aside>
              <button type="submit">Start</button>
            </aside>
          </form>
          <aside>
            <h3>
              <u>Repositories</u>
            </h3>
            {repositories.map((r) => (
              <details key={r.id}>
                <summary>{r.full_name}</summary>
                <hr />
                <pre>{JSON.stringify(r, 0, 1)}</pre>
              </details>
            ))}
          </aside>
        </>
      )}
    </>
  );
}

export default App;
