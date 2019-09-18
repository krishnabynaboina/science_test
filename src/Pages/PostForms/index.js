import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {createPost} from '../../actions/postActions'
import {connect} from 'react-redux'

class PostForms extends Component {
    state = {
      name: '',
      body: '',
      input: {
        value: '',
        units: '',
        targetUnits: ''
      },
      outPut: {
        value: '',
        status: ''
      }
    }
    onSubmit = () => {
      const post = {
        title: this.state.name,
        body: this.state.body
      }
      this.props.createPost(post)
    }
    onChange =(e, type) => {
      this.setState({[type]: e.target.value})
    }
    render () {
      return (
        <div>
          <h3>Posts</h3>
          <TextField
            id='name'
            label='Name'
            value={this.state.name}
            onChange={(e) => this.onChange(e, 'name')}
            margin='normal'
          />
          <TextField
            id='multiline-flexible'
            label='Body'
            multiline
            rows='3'
            value={this.state.body}
            onChange={(e) => this.onChange(e, 'body')}
            margin='normal'
          /><br />
          <Button color={'primary'} variant='raised' onClick={() => this.onSubmit()}>Submit</Button>

        </div>
      )
    }
}
// export default PostForms;
export default connect(null, { createPost })(PostForms)
