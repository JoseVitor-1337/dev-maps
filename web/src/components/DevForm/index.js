import React, { useState, useEffect } from 'react'

function DevForm({ onSubmit }) {
  const [githubUserName,setGithubUserName] = useState("")
  const [techs,setTechs] = useState("")
  const [latitude,setLatitude] = useState("")
  const [longitude,setLongitude] = useState("")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      
      const { latitude, longitude } = coords

      setLatitude(latitude)
      setLongitude(longitude)
    }, (error) => {
      console.log(`error`, error)
    })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    await onSubmit({
      github_username: githubUserName,
      techs,
      latitude,
      longitude
    })

    setGithubUserName("")
    setTechs("")
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input value={githubUserName} onChange={(e) => setGithubUserName(e.target.value)} name="github_username" id="github_username" required />
      </div>
      
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input value={techs} onChange={(e) => setTechs(e.target.value)} name="techs" id="techs" required />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">latitude</label>
          <input onChange={(e) => setLatitude(e.target.value)} type="number" defaultValue={latitude} name="latitude" id="latitude" required />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input onChange={(e) => setLongitude(e.target.value)} type="number" defaultValue={longitude} name="longitude" id="longitude" required />
        </div>
      </div>
    

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
