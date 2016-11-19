import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import RaisedButton from 'material-ui/RaisedButton'
import ImageDelete from 'material-ui/svg-icons/action/delete'
import ImageAdd from 'material-ui/svg-icons/content/add'
import ImageReplay from 'material-ui/svg-icons/av/replay'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import { addLine, editLine, deleteLine, resetLines, redirect } from './actions'

const mapStateToProps = ({ experiments, lines }) => {
  return { experiments, lines }
}

const actionCreators = {
  addLine, editLine, deleteLine, resetLines, redirect
}

class SequentialRedirection extends Component {
  constructor(props, context) {
    super(props, context)
    this.addLine = this.addLine.bind(this)
    this.resetLines = this.resetLines.bind(this)
    this.deleteLine = this.deleteLine.bind(this)
    this.editLine = this.editLine.bind(this)
    this.redirect = this.redirect.bind(this)
    this.state = {
      open: false, // SnackBar
      text: ""     // Snackbar
    }
  }

  redirect() {
    const { lines, redirect } = this.props
    const from = lines[0].text, to = lines[1].text
    sendData("redirect", { from, to })
    redirect()
    this.setState({
      open: true,
      text: "リダイレクトしました."
    })
  }

  refresh() {
    sendData("refresh", null)
    this.setState({
      open: true,
      text: "実験リストを更新しました."
    })
  }

  resetLines() {
    this.props.resetLines()
  }

  addLine() {
    const id = 1 + Math.max.apply(null, [0].concat(this.props.lines.map(line => line.id)))
    this.props.addLine(id.toString())
  }

  editLine(index, value) {
    this.props.editLine(index, value)
  }

  handleChange(row, event, index, value) {
    this.editLine(row, value)
  }

  deleteLine(event, index) {
    this.props.deleteLine(index)
  }

  getLabel(index, length) {
    if (index == 0) {
      return "From: "
    } else if (index == length - 1) {
      return "To: "
    } else {
      return "Via: "
    }
  }

  render() {
    const { lines, experiments } = this.props
    const canRedirect = lines.length >= 2 && lines[0].text.match(/\S/g) && lines[1].text.match(/\S/g)
    const items = experiments.map((x, i) => <MenuItem key={i} value={x} primaryText={x}/>)
    return (
      <Card>
        <CardText>
          <p>実験記号を入力してください。</p>
          <table>
            <tbody>
            {
              lines.map((token, index) => (
                <tr key={token.id}>
                  <td style={{width: "30%"}}>
                    <label htmlFor={token.id}>{ this.getLabel(index, lines.length) }</label>
                    <SelectField
                      floatingLabelText="Experiment Token"
                      value={lines[index].text}
                      onChange={this.handleChange.bind(this, index)}
                      style={{width: "95%"}}
                    >
                      {items}
                    </SelectField>
                  </td>
                  <td style={{width: "5%"}}>
                    <FloatingActionButton
                      mini={true}
                      secondary={true}
                      disabled={lines.length == 2}
                      onTouchTap={(event) => this.deleteLine(event, index)}
                    >
                      <ImageDelete />
                    </FloatingActionButton>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table>
          <FloatingActionButton
            mini={true}
            onTouchTap={this.addLine}
          >
            <ImageAdd />
          </FloatingActionButton>
          <FloatingActionButton
            mini={true}
            onTouchTap={this.refresh.bind(this)}
          >
            <ImageReplay />
          </FloatingActionButton>
          <Snackbar
            open={this.state.open}
            message={this.state.text}
            autoHideDuration={2000}
            onRequestClose={() => this.setState({open: false})}
          />
        </CardText>
        <CardActions>
            <RaisedButton
              label="リダイレクト"
              primary={true}
              onClick={this.redirect}
              disabled={!canRedirect}
            />
          <RaisedButton
            label="リセット"
            onClick={this.resetLines}
            secondary={true}
          />
        </CardActions>
      </Card>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(SequentialRedirection);
