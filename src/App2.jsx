import { useCallback, useState } from "react";
import Names from "./Names";
import "./App.css";

function App2({ octokit = null, setIsLoading = () => {} }) {
  const [collaboratorNames, setCollaboratorNames] = useState([""]);
  const [messages, setMessages] = useState([]);

  const onStartTask = useCallback(
    async (e) => {
      e.preventDefault();
      if (!octokit || !collaboratorNames.length) return;
      setIsLoading(true);
      try {
        const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser();

        for (const repo of repos) {
          const { data: collaborators } = await octokit.rest.repos.listCollaborators({
            owner: repo.owner.login,
            repo: repo.name,
          });

          for (const cname of collaboratorNames) {
            const collaborator = collaborators.find((c) => c.login === cname);

            if (collaborator) {
              await octokit.rest.repos.removeCollaborator({
                owner: repo.owner.login,
                repo: repo.name,
                username: cname,
              });
              setMessages((ms) => ms.concat(`Removed ${cname} from ${repo.name}`));
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setCollaboratorNames([""]);
      }
    },
    [octokit, collaboratorNames, setIsLoading]
  );

  return (
    <>
      <form className="form" onSubmit={onStartTask}>
        <Names title="collaborator" names={collaboratorNames} setNames={setCollaboratorNames} />
        <aside>
          <button type="submit">Remove</button>
        </aside>
      </form>
      <aside>
        <h3>
          <u>Logs</u>
        </h3>
        {messages.map((r) => (
          <p key={r}>{r}</p>
        ))}
      </aside>
    </>
  );
}

export default App2;
