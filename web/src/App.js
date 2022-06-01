import React, { useState, useEffect } from 'react'
import api from './services/api'

import "./global.css"
import "./App.css"
import "./Sidebar.css"
import "./Main.css"

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
   async function getDevs() {
    const response = await api.get("/devs")

    setDevs(response.data)
   }

   getDevs()
  }, [])

  const handleAddDev = async (devFormValues) => {
    const response = await api.post("/devs", devFormValues)

    setDevs([...devs, response.data])
  }
  
  return (
    <div className="app" >
     <aside>
        <strong>Cadastrar</strong>

        <DevForm onSubmit={handleAddDev} />
     </aside>
     <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
     </main>
    </div>
  );
}

export default App;
