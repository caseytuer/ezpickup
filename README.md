# ezpickup
*By Casey Tuer - [Visit ezpickup](https://ezpickup.onrender.com/)*

**Table of Contents**
* [ezpickup introduction](#ezpickup-introduction)
* [Application Architecture & Technologies Used](#application-architecture) 
* [Frontend Overview](#frontend-overview)
* [Backend Overview](#backend-overview)
* [From the Developer](#from-the-developer)

## ezpickup introduction
ezpickup is a fullstack Flask/React app that lets users find and host local pickup sports games. 

Users can find games in their area, view particular details of a game (start time, skill level, equipment needed, etc.), comment on a game's page, join a game, or host a game of their own. 

##### ezpickup splash
![ezpickup splash](/readme-resources/landing-page.png)

ezpickup is also integrated with the [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) library. Users see pins on a map representing the location of all games being hosted and can click on a pin to be redirected to that game's page. 

##### game page with map component
![ezpickup artist search with more info](/readme-resources/map-component.png)

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
## Application Architecture
Most of the application logic occurs within the front end's [Redux](https://redux.js.org/) store which processes interactions with the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) via the [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) library and manages application state to allow dynamic data flow throughout. The app is entirely syled with pure CSS (no outside styling libraries or frameworks used).

The backend responds to frontend requests, and serves data to the frontend from a [PostgreSQL](https://www.postgresql.org/) relational database which provides the persistent storage of data. 

## Frontend Overview

#### <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
[React](https://reactjs.org/) is a free and open-source frontend JavaScript library. It allows developers to easily disect a project into easily implemented components and pass data from one component to another. It has a rich and well documented ecosystem maintained by Facebook and a community of individual open-souce developers and companies. It was used to create all of the components which make up the frontend of the application.

#### <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
[Redux](https://redux.js.org/) and the [react-redux](https://react-redux.js.org/) library were used to manage application state and make fetch requests to the backend for data. Redux provides a store which contains the state of an app's variables and ensures prdictable updates of these variables from specific behavior. It was used to provide all components easy access to dynamically changing data without prop threading.

## Backend Overview

#### <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
[Flask](https://flask.palletsprojects.com/en/2.0.x/) is a microframework developed in Python, which was used to construct necessary backend components for web development such as request handling, routing, and sessions, along with built-in modules and extensions such as [Flask-WTF](https://flask-wtf.readthedocs.io/en/0.15.x/) for form validation and error handling and [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) for facilitating the creation and seeding of database models.


#### <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
[PostgreSQL](https://www.postgresql.org/) is a powerfull and reliable open-source object-relational database management system that was used to store the application's data. 

## From the Developer
Building ezpickup has been a fun and rewarding learning experience. The application was built using technologies which are new to me and is a work in progress which I plan on expanding on in time. Thank you to App Academy and all the wonderful instructors who have contributed to my programming journey over the last several months.

Thanks for reading ❤️
