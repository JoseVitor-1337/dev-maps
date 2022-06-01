import React from 'react'

import './style.css'

function DevItem({ dev }) {
  
  return (
    <li key={dev._id} className="dev-item">
      <header>
      <img src={dev.avatar_url} alt={dev.name} />
      <div className="dev-info">
        <strong>{dev.name}</strong>
        <span>{dev.techs.join(", ")}</span>
      </div>
      </header>
      <p>{dev.bio || "Sem biografia"}</p>
      <a 
        target="_blank" 
        href={`https://github.com/${dev.github_username}`} 
        rel="noreferrer"
      >
        Acessar perfil do github
      </a>
    </li>
  );
}

export default DevItem;
