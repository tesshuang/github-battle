import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './context/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from './components/Loading'

const Popular = React.lazy(() => import('./components/Popular')) 
const Battle = React.lazy(() => import('./components/Battle'))
const Result = React.lazy(() => import('./components/Result'))

function App () {
  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () => {
    setTheme(( theme ) => ({
      theme: theme === 'light' ? 'dark' : 'light'
    }))
  }

  const state = React.useMemo(() => ({
    theme,
    toggleTheme
  }), [theme])

  return (
    <Router>
      <ThemeProvider value={state}>
        <div className={theme}> 
          <div className="container">
            <Nav />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/' component={Popular} />
                <Route exact path='/battle' component={Battle} />
                <Route path='/battle/result' component={Result} />
                <Route render={() => (<h1>404</h1>)} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)