// import createBrowserHistory from 'history/createBrowserHistory';
// import createMemoryHistory from 'history/createMemoryHistory';
// export default process.env.BROWSER ? createBrowserHistory() : createMemoryHistory();

import createHistory from 'history/createBrowserHistory'

const history = createHistory()
export default history