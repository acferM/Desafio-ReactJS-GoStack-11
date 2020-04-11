import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => { setRepositories(response.data) })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Novo repositório ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    })

    const newRepository = response.data

    setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const response = await api.get('repositories')

    setRepositories(response.data)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
