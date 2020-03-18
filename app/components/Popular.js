import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopular } from '../utils/fetchPopular'

function LanguageNav({ selected, onUpdateLanguage}) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return(
    <ul className='flex-center'>
      {languages.map((language, index) => (
        <li key={index}>
          <button 
            style={language===selected ? {color: 'red'} : null}
            className='nav-link btn-clear' 
            onClick={() => onUpdateLanguage(language)}>
              {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguageNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repo: null,
      error: null,
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    console.log(selectedLanguage);
    this.setState({
      selectedLanguage
    })

    fetchPopular(selectedLanguage)
    .then((repo) => {
      console.log(repo);
      this.setState({
        repo,
        error: null
      })
    })
    .catch((err) => {
      console.log('Error fetching data: ', err);
      this.setState({
        error: 'There is an error fetching data.'
      })
    })
  }

  render() {
    const { selectedLanguage, repo, error } = this.state;

    return(
      <React.Fragment>
        <LanguageNav 
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

      {repo && <pre>{JSON.stringify(repo, null, 2)}</pre>}
      </React.Fragment>
    )
  }
}