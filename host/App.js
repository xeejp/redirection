import React, { Component } from 'react'
import { connect } from 'react-redux'

import SequentialRedirection from './SequentialRedirection'
import { fetchContents } from 'shared/actions'

const actionCreators = {
  fetchContents
}

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchContents();
  }

  render() {
    return (
      <div>
        <SequentialRedirection />
      </div>
    )
  }
}

export default connect(null, actionCreators)(App)
