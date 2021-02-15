import React, { Component } from "react"
//import axios from "axios"
import Post from "../../components/Post/Post"
import FullPost from "./FullPost/FullPost"
//import NewPost from "./NewPost/NewPost"
import "./Blog.css"
import axios from "../../axios"
import { Switch, Route, NavLink, Redirect } from "react-router-dom"
import Posts from "./Posts/Posts"
import asyncComponent from "../../hoc/asyncComponent"

const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost")
})

class Blog extends Component {
  state = {
    auth: true,
  }
  deleteHandler = (id) => {
    const posts = [...this.state.posts]
    const delPost = posts.filter((post) => post.id !== id)
    this.setState({ posts: delPost })
  }
  render() {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  activeClassName='my-active'
                  activeStyle={{
                    color: "#7584dd",
                    textDecoration: "underline",
                  }}
                  to='/posts/'
                  exact
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {/* <FullPost
              id={this.state.selectedPostId}
              deleteHandler={this.deleteHandler}
            />*/}

          {this.state.auth ? (
            <Route path='/new-post' component={AsyncNewPost} />
          ) : null}
          <Route path='/posts' component={Posts} />

          {/*<Route path='/' component={Posts} />*/}
          <Redirect from='/' to='/posts' />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    )
  }
}

export default Blog
