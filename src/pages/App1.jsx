import { useCallback, useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { Octokit } from "@octokit/rest";
import Names from "../components/Names";
import NoPAT from "../components/NoPAT";

function App1() {
  const { showAlert, setLoading } = useContext(GlobalContext);

  const [pat, setPat] = useState("");
  const [octokit, setOctokit] = useState(null);
  const [repoNames, setRepoNames] = useState([""]);
  const [collaboratorNames, setCollaboratorNames] = useState([]);
  const [repositories, setRepositories] = useState([]);

  const onStartTask = useCallback(
    async (e) => {
      e.preventDefault();
      if (!octokit || !repoNames.length) return;
      setLoading(true);
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
        showAlert({ type: "success", title: "Success !", text: "Collaborators added to Repositories" });
      } catch (error) {
        console.log(error);
        showAlert({ type: "error", title: "Error !", text: error.message });
      } finally {
        setLoading(false);
        setRepoNames([""]);
        setCollaboratorNames([]);
      }
    },
    [octokit, repoNames, setLoading, showAlert, collaboratorNames]
  );

  return (
    <>
      <header className="header">
        <label htmlFor="pat">PAT Token:</label>
        <input id="pat" type="text" value={pat} onChange={(e) => setPat(e.target.value)} />
        <button onClick={() => setOctokit(new Octokit({ auth: pat })) ?? setPat("")}>Init</button>
      </header>
      {!octokit ? (
        <NoPAT />
      ) : (
        <>
          <form className="form" onSubmit={onStartTask}>
            <Names title="repository" names={repoNames} setNames={setRepoNames} />
            <Names title="collaborator" names={collaboratorNames} setNames={setCollaboratorNames} />
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

export default App1;
