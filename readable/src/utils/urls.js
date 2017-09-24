import NotFound from '../Component/NotFound'
import HomePage from '../Pages/HomePage'


export const main = [{
  path: '/',
  exact: false,
  component: HomePage,
  
}, {
  path: '*',
  exact: false,
  component: NotFound,
}
/* And so on. */];


export const Urls = {
  user: {
    path: '#/user/:userId',
    // main: UserPage,
  },
  category: {
    path: '#/category/:categoryName',
  },
  filter: {
    path: '#/&order=:type'
  }
}
