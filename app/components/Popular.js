import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopular } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationCircle, FaCode } from "react-icons/fa"
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

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
    <ul className="grid space-around">
      {repos.map((repo, index) => {
         const { name, owner, html_url, stargazers_count, fork, open_issues_count } = repo;
         const { login, avatar_url } = owner;
        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={name}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text='Github username'>
                    <FaUser color="orange" size={22} />
                    <a href={html_url}>
                      {login}
                    </a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="yellow" size={22} />
                  <span>{stargazers_count} stars</span>
                </li>
                <li>
                  <FaCodeBranch color="blue" size={22} />
                  <span>{fork} forks</span>
                </li>
                <li>
                  <FaExclamationCircle color="pink" size={22} />
                  <span>{open_issues_count} issues</span>
                </li>
              </ul>
            </Card>            
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
    console.log(this.props);
    return(
      <React.Fragment>
        <LanguageNav 
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <Loading text='Fetching Data' />}
        {error && <p>{error}</p>}
        {repo[selectedLanguage] && <RepoGrid repos={repo[selectedLanguage]}/>}
      </React.Fragment>
    )
  }
}