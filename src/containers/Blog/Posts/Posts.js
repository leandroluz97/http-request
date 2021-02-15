import React, { Component } from "react"
import axios from "../../../axios"
import Post from "../../../components/Post/Post"
import "./Posts.css"
import FullPost from "../FullPost/FullPost"
import { Link, Route } from "react-router-dom"

export default class Posts extends Component {
  state = {
    posts: [],
  }
  componentDidMount() {
    axios
      .get(`/posts`)
      .then((response) => {
        // const limitedPosts = response.data.filter((post, index) => index <= 24)
        const posts = response.data.slice(0, 4)
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          }
        })

        this.setState({ posts: updatedPosts })
      })
      .catch((err) => {
        //this.setState({ error: true })
        console.log(err)
      })
  }

  postSelectedHandler = (id) => {
    //this.setState({ selectedPostId: id })
    this.props.history.push("/posts/" + id)
  }

  render() {
    let posts = null
    if (this.state.error) {
      posts = (
        <p style={{ textAlign: "center", color: "red" }}>Error try again</p>
      )
    } else {
      posts = this.state.posts.map((post) => {
        return (
          // <Link to={`/posts/${post.id}`} key={post.id}>
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          //</Link>
        )
      })
    }

    return (
      <div>
        <section className='Posts'>{posts}</section>{" "}
        <Route
          exact
          path={this.props.match.url + "/:id"}
          component={FullPost}
        />
      </div>
    )
  }
}
