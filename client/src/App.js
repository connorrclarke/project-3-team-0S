import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => setBackendData(data)
    )
  }, [])

  return (
    <div>
      {/* <h1>Users</h1>
      <ul>
        {backendData.users && backendData.users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul> */}
      {(typeof backendData.users === 'undefined') ? (
        <h1>Loading...</h1> 
        ): (
          backendData.users.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )}
    </div>
  )
}

export default App