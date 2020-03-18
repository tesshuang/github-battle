import React from 'react';

export default class NavBar extends React.Component {
  
  render() {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return(
      <ul className='flex-center'>
        {languages.map((language, index) => (
          <li key={index}>
            <button className='nav-link btn-clear'>{language}</button>
          </li>
        ))}
      </ul>
    )
  }
}