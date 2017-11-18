# Talk About React 

"Talk About React - Student Discussion Board" is a [reddit](https://www.reddit.com/) style discussion forum web app, for [Udacity’s React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) second project assignment, "Readable". Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Also, users will also be able to edit and delete posts and comments.

* This app was built with react, redux, [react-redux-router](https://github.com/reactjs/react-router-redux), [redux-thunk](https://github.com/gaearon/redux-thunk), [material-ui](https://github.com/callemall/material-ui).

* Most application state(Create, Read, Edit, Delete, Voting posts/comments) is managed by the Redux store. Updates are triggered by dispatching actions to reducers.

## Table of contents
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Copyright and License](#copyright-and-license)

## Demo

![screencast](screencast.gif)


### Live Demo : TBD 
For a demo, check out [https://reactnd-readable.firebaseapp.com/](https://reactnd-readable.firebaseapp.com/)

## Quick Start
#### Run React App (Frontend)
* Clone project locally `git clone https://github.com/sujinleeme/reactnd-project-readable.git`.
* Go to react app `cd readable`.
* Install all project dependencies with `npm install` in `readable` folder.
* Run server with `npm start`.
* Check console or browser if server runs on [http://localhost:3000/](http://localhost:3000/).


#### Run local backend development server (Node)
To install and start the API server, run the following commands in  `api-server` directory:

* Go to Server Directory `cd readable/src/api-server`.
* Install all server dependencies with `npm install`.
* Run backend server with `node server.js`.
* Check console or browser if server runs on [http://localhost:3001/](http://localhost:3001/).

### To build & deploy on firebase:
```
npm run build && npm run deploy
```

## Documentation
### What's included
Within the download you'll find the following directories and files in `src`:

```
|-- api-server
|   |-- README.md
|   |-- categories.js
|   |-- comments.js
|   |-- config.js
|   |-- package.json
|   |-- posts.js
|   |-- server.js
|   `-- tabs.js
|-- components
|   |-- assets
|   |   |-- GithubIcon.js
|   |   `-- LoadingProgress.js
|   |-- footer
|   |   `-- CopyrightBar.js
|   |-- header
|   |   `-- HeaderBar.js
|   |-- menu
|   |   |-- CategoryContainer.js
|   |   `-- TabContainer.js
|   |-- pages
|   |   |-- AllPostsPage.js
|   |   |-- CategoryPostsPage.js
|   |   |-- MainRouterSettingLayoutPage.js
|   |   |-- NotFound.js
|   |   |-- PostDetailComments.js
|   |   `-- PostDetailPage.js
|   `-- post
|       |-- body
|       |   `-- PostContent.js
|       |-- buttons
|       |   |-- CommentButton.js
|       |   |-- PostSaveCancelButton.js
|       |   |-- PostSettingButton.js
|       |   `-- UpDownVoter.js
|       |-- create
|       |   |-- NewComment.js
|       |   `-- NewPost.js
|       `-- list
|           |-- PostCard.js
|           `-- PostListContainer.js
|-- history.js
|-- index.css
|-- index.js
|-- modules
|   |-- actionTypes
|   |   |-- menuTypes.js
|   |   `-- postsTypes.js
|   |-- actions
|   |   |-- menu.js
|   |   `-- posts.js
|   |-- reducers
|   |   |-- menu.js
|   |   `-- posts.js
|   `-- root
|       |-- configStore
|       |   `-- index.js
|       |-- configurl.js
|       |-- headers.js
|       `-- rootReducer
|           `-- index.js
|-- registerServiceWorker.js
|-- store.js
|-- styles
|   |-- CustomTheme.js
|   |-- assets
|   |   `-- LoadingProgress.js
|   |-- buttons
|   |   |-- CommentButton.js
|   |   |-- PostSaveCancelButton.js
|   |   `-- UpDownVoter.js
|   |-- footer
|   |   `-- CopyrightBar.js
|   |-- form
|   |   |-- NewComment.js
|   |   `-- NewPost.js
|   |-- header
|   |   `-- HeaderBar.js
|   |-- menu
|   |   |-- CategoryContainer.js
|   |   `-- TabContainer.js
|   |-- page
|   |   |-- MainRouterSettingLayoutPage.js
|   |   |-- NotFound.js
|   |   `-- PostDetailPage.js
|   `-- post
|       |-- PostCard.js
|       |-- PostContent.js
|       `-- PostListContainer.js
`-- utils
    `-- utils.js
```

### TBD
* Use Firebase for backend.

## Copyright and License 
* A project [starter server repository](https://github.com/udacity/reactnd-project-readable-starter) contributed by Udacity.
* The MIT License.
