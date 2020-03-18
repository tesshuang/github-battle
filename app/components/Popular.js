import React from 'react';
import PropTypes from 'prop-types';

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
      selectedLanguage: 'All'
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    console.log(selectedLanguage);
    this.setState({
      selectedLanguage
    })
  }
  render() {
    const { selectedLanguage } = this.state;

    return(
      <React.Fragment>
        <LanguageNav 
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
      </React.Fragment>
    )
  }
}