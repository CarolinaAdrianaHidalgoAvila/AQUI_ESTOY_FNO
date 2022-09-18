import React from 'react'
import Navbar from './Navbar'
import MediaCard from './MediaCard'
const linksArray = ['Pets', 'About Us' , "Contact Us"]

function HomePage() {
  return (
    <div className="homePage">
      <Navbar links={linksArray}/>
      <MediaCard/>
    </div>
  )
}

export default HomePage