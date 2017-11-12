# reactnd-project-readable

This is a reddit style, content and comment web app for [Udacity’s React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) second project. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

## Table of contents
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Copyright and License](#copyright-and-license)

## Demo
For a demo, check out [https://reactnd-readable.firebaseapp.com/](https://reactnd-readable.firebaseapp.com/)

## Quick Start
#### Run React App (Frontend)
* Clone project locally `git clone https://github.com/sujinleeme/reactnd-project-readable.git`
* Go to react app `cd readable`
* Install all project dependencies with `npm install`
* Run server with `npm start`
* Check console or browser if server runs on [http://localhost:3000/](http://localhost:3000/)


#### Run local backend development server (Node)
To install and start the API server, run the following commands in  `api-server` directory:

* Go to Server Directory `cd readable/src/api-server`
* Install all server dependenices with `npm install`
* Run backend server with `node server.js`
* Check console or browser if server runs on [http://localhost:3001/](http://localhost:3001/)

### To build & deploy on firebase:
```
npm run build && npm run deploy
```

## Documentation
### What's included
Within the download you'll find the following `src/` directories and files:
```
|-- components
|   |-- assests
|   |   |-- GithubIcon.js
|   |   `-- LoadingProgress.js
|   |-- container
|   |   |-- CategoryContainer.js
|   |   |-- NotFound.js
|   |   |-- PostContainer.js
|   |   |-- PostDetailContainer.js
|   |   `-- TabContainer.js
|   |-- footer
|   |   `-- CopyrightBar.js
|   |-- header
|   |   `-- HeaderBar.js
|   |-- layout
|   |   `-- MainLayout.js
|   |-- pages
|   |   |-- HomePage.js
|   |   `-- NotFound.js
|   `-- post
|       |-- body
|       |   |-- PostCardList.js
|       |   |-- PostContent.js
|       |   `-- PostDetail.js
|       |-- buttons
|       |   |-- FloatingNewPostButton.js
|       |   |-- PostSaveCancelButton.js
|       |   |-- PostSettingButton.js
|       |   `-- UpDownVoter.js
|       `-- create
|           |-- NewComment.js
|           `-- NewPost.js
|-- history.js
|-- index.css
|-- index.js
|-- modules
|   |-- actions
|   |   |-- menu.js
|   |   `-- posts.js
|   |-- reducers
|   |   |-- menu.js
|   |   `-- posts.js
|   `-- root
|       |-- configStore
|       |   `-- index.js
|       |-- headers.js
|       `-- rootReducer
|           `-- index.js
|-- registerServiceWorker.js
|-- store.js
|-- styles
|   |-- container
|   |   |-- CategoryContainer.js
|   |   `-- TabContainer.js
|   |-- header
|   |   `-- CopyrightBar.js
|   `-- post
|       |-- NewComment.js
|       |-- NewPost.js
|       |-- PostCardList.js
|       |-- PostContent.js
|       |-- PostSaveCancelButton.js
|       |-- PostStyle.js
|       `-- PostVote.js
`-- utils
    |-- helper.js
    |-- urlconfig.js
    `-- urls.js
```
### Requirements
* Most application state(Create, Read, Edit, Delete, Voting posts/comments) is managed by the Redux store. Updates are triggered by dispatching actions to reducers.

## TBD
* Use Firebase for backend

## Copyright and License 
A Project [starter server repository](https://github.com/udacity/reactnd-project-readable-starter) contributed by Udacity.
