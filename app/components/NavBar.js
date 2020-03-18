import React from 'react';

export default class NavBar extends React.Component {
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
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return(
      <ul className='flex-center'>
        {languages.map((language, index) => (
          <li key={index}>
            <button 
              style={language===this.state.selectedLanguage ? {color: 'red'} : null}
              className='nav-link btn-clear' 
              onClick={() => this.updateLanguage(language)}>
                {language}
            </button>
          </li>
        ))}
      </ul>
    )
  }
}