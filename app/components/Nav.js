import React from 'react'
import { ThemeConsumer } from '../context/theme'

export default class Nav extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => {
          console.log(toggleTheme)
          return(
            <nav>
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
}