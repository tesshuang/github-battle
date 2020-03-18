export function fetchPopular(language) {
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  // const response = await fetch(endpoint);
  // const data = await response.json();
  // console.log(data);
  // return await data.items;
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.items) {
          throw new Error(data.message)
        }
        return data.items
      })
}
