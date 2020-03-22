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
                className='btn'
                onClick={toggleTheme}>
                  {theme === 'light' ? '🔦' : '💡'}
              </button>
            </nav>
          )}}
      </ThemeConsumer>
    )
  }
}