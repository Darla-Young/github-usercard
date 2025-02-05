import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/Darla-Young')

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

  // .then(response => {
  //   console.log(response);
  // })

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
  .then(response => {
    console.log(response);
    document.querySelector('.cards').append(createCard(response));
  })
  .catch(error => {
    console.log('step 4: ' + error);
  });

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/
const followersArray = [];
axios.get('https://api.github.com/users/Darla-Young/followers')
  .then(response => {
    response.data.forEach(follower => {
      followersArray.push(follower.login);
    });
    followersArray.forEach(follower => {
      axios.get(`https://api.github.com/users/${follower}`)
        .then(response => {
          document.querySelector('.cards').append(createCard(response));
        })
        .catch(error => {
          console.log('step 5b: ' + error);
        })
    })
  })
  .catch(error => {
    console.log('step 5a: ' + error);
  });

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
const createCard = user => {
  const holder = document.createElement('div');
  const pic = document.createElement('img');
  const infoHolder = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const profileLink = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  holder.className = 'card';
  pic.setAttribute('src', user.data.avatar_url);
  infoHolder.className = 'card-info';
  name.className = 'name';
  name.textContent = user.data.name;
  username.className = 'username';
  username.textContent = user.data.login;
  location.textContent = 'Location: ' + user.data.location;
  profile.textContent = 'Profile:'
  profileLink.setAttribute('href', user.data.url);
  profileLink.textContent = user.data.url;
  followers.textContent = 'Followers: ' + user.data.followers;
  following.textContent = 'Following: ' + user.data.following;
  bio.textContent = "Bio: " + user.data.bio;

  holder.append(pic, infoHolder);
  infoHolder.append(name, username, location, profile, followers, following, bio);
  profile.appendChild(profileLink);

  return holder;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
