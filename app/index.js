import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from './components/NavBar'
import './index.css'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <NavBar />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)