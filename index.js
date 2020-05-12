'strict'

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#results-list').empty();
  
  //loop through the Json object
  for (let i = 0; i < responseJson.length; i++) {
    //Display the Repo name
    //Display link to the repo URL
    $('#results-list').append(
      `<h3>${i+1}.)  Name: ${responseJson[i].name}</h3>
      <p>Repo Link: <a href="${responseJson[i].clone_url}" target="_blank">${responseJson[i].name}</a></p>`
    )};

  //display the results section  
  $('#results').removeClass('hidden');
};

//not using.  Update later
function formatQueryParams(params) {
  //create an array of the keys in the "params" object
  const queryItems = Object.keys(params)
  //for each of the keys in that array, create a string with the key and the key's value in the "params" object
  .map(key => `${key}=${params[key]}`)
  //return a string of the keys and values, separated by "&"
  return queryItems.join('&');
}

function getUser(query) {
  //create the query parameters
  //const params = {
    //set the "q" parameter equal to the value the user input
    //q: query,
  //};

  //create a string with the original URL and the new parameters
  //const queryString = formatQueryParams(params)
  const url = `${searchURL}${query}/repos?type=owner&sort=created&direction=desc`;
  console.log('URL: ' + url);

  const options = {
    headers: new Headers({
      "Accept":"application/vnd.github.v3.full+json"})
  };

  fetch(url, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Response: " + response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}

//watch for the form submission
function watchForm() {
  $('form').submit(event => {
    //prevent default form behavior
    event.preventDefault();
    //capture the value of the user's input
    const searchUser = $('#js-search-user').val();
    getUser(searchUser);
  });
}

//call DOM functions on load
$(watchForm);