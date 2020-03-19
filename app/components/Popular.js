import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopular } from '../utils/fetchPopular'
import { FaUser } from "react-icons/fa"


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

function RepoGrid({repos}) {

 return(
    <ul>
      {repos.map((repo, index) => {
         const { name, owner, html_url, stargazers_count, fork, open_issues_count } = repo;
         const { login, avatar_url } = owner;
        return (
          <li key={html_url}>
            <p>#{index + 1}</p>
            <img src={avatar_url} alt="Avatar" />
            <h4>{name}</h4>
            <ul>
              <li>
                {login}
              </li>
              <li>
                {stargazers_count} stars
              </li>
              <li>
                {fork} forks
              </li>
              <li>
                {open_issues_count} issues
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
 )
}

RepoGrid.protoTypes = {
  repos: PropTypes.array.isRequired
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
    // console.log(repo[selectedLanguage]);
    return(
      <React.Fragment>
        <LanguageNav 
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {repo[selectedLanguage] && <RepoGrid repos={repo[selectedLanguage]}/>}
      </React.Fragment>
    )
  }
}