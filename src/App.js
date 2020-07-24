import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  } ,[]);  

  async function handleAddRepository() {
    const response = await api.post('repositories',
      {
        "title" : "Desafio React.js"+Date.now(), 
        "url" : "http://github.com/...", 
        "techs" : ["Node.js", 'React.js']
      }      
    );
      const newRespository = response.data;

      setRepositories([...repositories, newRespository])
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/'+ id);
    var index = repositories.findIndex(x => x.id === id )
    
    var copyRepositories = [...repositories];
    copyRepositories.splice(index,1)
     setRepositories(copyRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(rep => (
          <li key={rep.id}>
            {rep.title}

            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li> 
      ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
