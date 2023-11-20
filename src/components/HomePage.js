import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './homepage.css'

const HomePage = () => {
  return (
    <section className='homepage'>

      <div className='hero darken-page'>
        
        <video autoPlay loop muted playsInline className='homepageBgVid darken-page'>
            <source src={require('../images/homepageVid.mp4')}></source>
        </video>

        <div className='content'>
          <h1>
            WELCOME TO SOCCER CENTRAL
          </h1>
        </div>

      </div>
        

    </section>
  )
}

export default HomePage