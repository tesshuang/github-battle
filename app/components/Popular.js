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
      repo: {},
      error: null,
    }

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(selectedLanguage) {
    // console.log(selectedLanguage);
    this.setState({
      selectedLanguage,
      error: null,
    })

    if (!this.state.repo[selectedLanguage]) {
      fetchPopular(selectedLanguage)
        .then((data) => this.setState(({repo}) => ({
          repo: {
            ...repo,
            [selectedLanguage]: data,
          }
        }))
        )
        .catch((err) => {
          console.log('Error fetching data: ', err);
          this.setState({
            error: 'There is an error fetching data.'
          })
        })
    }

  }
  isLoading() {
    const { selectedLanguage, repo, error } = this.state;

    return !repo[selectedLanguage] && error === null
  }

  render() {
    const { selectedLanguage, repo, error } = this.state;
    console.log(repo[selectedLanguage]);
    return(
      <React.Fragment>
        <LanguageNav 
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {repo[selectedLanguage] && <pre>{JSON.stringify(repo[selectedLanguage], null, 2)}</pre>}
      </React.Fragment>
    )
  }
}