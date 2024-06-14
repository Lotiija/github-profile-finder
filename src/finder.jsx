import React, { useEffect, useState } from 'react'
import User from './user';
import './index.css'

const GithubProfileFinder = () => {
  const [userName, setUserName] = useState("Lotiijah");
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchData() {
    try {
      setLoading(true)

      const res = await fetch(`https://api.github.com/users/${userName}`);
      const data = await res.json();
      setLoading(false)

      if (data) {
        setUserData(data)
        setLoading(false)
        setUserName('');
      }
      
    } catch (error) {
      setError(error.msg)
      setLoading(false)
      
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = () => {
    fetchData();
  }

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>Sorry Error Occurred...!</div>
    )
  }


  return (
    <div className='github-profile-container'>
      <div className='input-wrapper'>
        <input 
          name="search"
          type="text"
          value={userName} 
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleSubmit}>search</button>
      </div>
      <div>
        {
          userData && <User user={userData}/>
        }
      </div>
    </div>
  )
}

export default GithubProfileFinder;