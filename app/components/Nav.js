import React from 'react'
import { ThemeConsumer } from '../context/theme'
import { NavLink } from 'react-router-dom'

export default function Nav () {
    const activeStyle = {
      color: 'red'
    }
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => {
          // console.log(toggleTheme)
          return(
            <nav className='row space-between'>
              <ul className='row nav'>
                <li>
                  <NavLink activeStyle={activeStyle} exact to='/' className='nav-link'>Project</NavLink>
                </li>
                <li>
                  <NavLink activeStyle={activeStyle} to='/battle' className='nav-link'>Battle</NavLink>
                </li>
              </ul>
              <button 
                style={{fontSize: 30}}
                className='btn-clear'
                onClick={toggleTheme}>
                  {theme === 'light' ? '🔦' : '💡'}
              </button>
            </nav>
          )}}
      </ThemeConsumer>
    )
  }