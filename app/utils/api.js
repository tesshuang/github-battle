function getErrorMsg(message, username) {
  if(message === 'Not Found') {
    return `${username} doesn't exist`
  }

  return message
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((profile) => {
      if(profile.message) {
        throw new Error(getErrorMsg(profile.message, username))
      }

      return profile
    })
}

function getRepos(username) {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => res.json())
    .then((repos) => {
      if(repos.message) {
        throw new Error(getErrorMsg(repos.message, username))
      }
      console.log(repos)
      return repos
    })
}

function getStarCount(repos) {
  return repos.reduce((count, { stargazers_count}) => count + stargazers_count , 0)
}

function calculateScore(followers, repos) {
  console.log(getStarCount(repos))
  return (followers * 3 ) + getStarCount(repos)
}
function getUserData(player) {
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ]).then(([ profile, repos ]) => ({
    profile,
    score: calculateScore(profile.followers, repos)
  }))
}

function sortPlayer(players) {
  return players.sort((a, b) => b.score - a.score)
}
export function battle(players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1])
  ]).then((results) => sortPlayer(results))
}

export function fetchPopular(language) {
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  // const response = await fetch(endpoint);
  // const data = await response.json();
  // console.log(data);
  // return await data.items;
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (!data.items) {
          throw new Error(data.message)
        }
        return data.items
      })
}
