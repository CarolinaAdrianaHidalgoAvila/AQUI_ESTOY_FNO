import React from 'react'
import Navbar from '../components/NavBar/Navbar'
import MediaCard from '../components/MediaCard/MediaCard';

function HomePage() {
  return (
    <>
      <div  style={{marginTop: '3em'}} className="homePage">
        <MediaCard/>
      </div>
    </>
  )
}

export default HomePage