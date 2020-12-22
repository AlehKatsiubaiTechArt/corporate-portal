import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import Home from './pages/Home'
import { setContext } from '@apollo/client/link/context'
import Main from './layouts/Main'
import Profile from './pages/Profile'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('AUTH_TOKEN')
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/">
              <Main>
                <Home />
              </Main>
            </Route>
            <Route exact path="/profile">
              <Main>
                <Profile />
              </Main>
            </Route>
            <Route path="*">Not Found</Route>
          </Switch>
        </Router>
      </ApolloProvider>
    </MuiPickersUtilsProvider>
  )
}

export default App
