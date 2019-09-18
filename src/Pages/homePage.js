import React, { Component } from 'react'
import PostForms from './PostForms'
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/postActions'

class HomePage extends Component {
  componentWillMount () {
    this.props.fetchPosts()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.newPost) {
      this.props.data.unshift(nextProps.newPost)
    }
  }

  render () {
    return (
      <div>
        <PostForms />
        {this.props.data.map(item => (
          <div>
            <h3>{item.title} </h3>
            <p>{item.body}</p>
          </div>
        ))}
        {/* <div onClick={this.getPavani}>Pavani</div>
                <div onClick={this.getVamsi}>Vamsi</div> */}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.data.items,
  newPost: state.data.item
})
export default connect(mapStateToProps, {fetchPosts})(HomePage)
