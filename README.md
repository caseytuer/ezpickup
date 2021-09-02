# ezpickup
*By Casey Tuer - [Visit ezpickup](http://ezpickup.herokuapp.com/)*

**Table of Contents**
* [ezpickup introduction](#ezpickup-introduction)
* [Application Architecture & Technologies Used](#application-architecture) 
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [Conclusion & Next Steps](#conclusion-and-next-steps)

## ezpickup introduction
ezpickup is a fullstack Flask/React app that lets users find and host local pickup sports games. 

Users can find games in their area, view particular details of a game such as start time, skill level, and equipment needed, comment on a game's page, and join a game. 

##### ezpickup introduction
![ezpickup introduction](/readme-resources/landing-page.png)

ezpickup is also integrated with the [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) library. Users see pins on a map representing the location of all games being hosted and can click on a pin to be redirected to that game's page. 

##### ezpickup map component
![ezpickup artist search with more info](/readme-resources/map-component.png)

## Application Architecture
Most of the application logic occurs within the front end's [Redux](https://redux.js.org/) store which processes dynamic interactions with the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) via the [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) library. ezpickup is syled with pure CSS (no outside styling libraries or frameworks).

The backend responds to frontend requests, serves data to the frontend from a [PostgreSQL](https://www.postgresql.org/) relational database which provides the persistent storage of data. 

## Technologies Used
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
* <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
* <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
* <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
* <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
* <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" /></a>
* <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
* <a href="https://www.heroku.com/home"><img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white" /></a>

