import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ImageDelete from 'material-ui/svg-icons/action/delete'
import ImageAdd from 'material-ui/svg-icons/content/add'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import { addLine, editLine, deleteLine, resetLines, redirect } from './actions'

const mapStateToProps = ({ lines }) => {
  return { lines }
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
      lines: ["", ""]
    }
  }

  redirect() {
    const { lines, redirect } = this.props
    const from = lines[0].text, to = lines[1].text
    sendData("redirect", { from, to })
    redirect()
  }

  resetLines() {
    this.props.resetLines()
  }

  addLine() {
    const id = 1 + Math.max.apply(null, [0].concat(this.props.lines.map(line => line.id)))
    this.props.addLine(id.toString())
  }

  editLine(event, index) {
    this.props.editLine(index, event.target.value)
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
    const { lines } = this.props;
    console.log(lines)
    const canRedirect = lines.length >= 2 && lines[0].text.match(/\S/g) && lines[1].text.match(/\S/g)
    return (
      <Card>
        <CardText>
          <p>実験記号を入力してください。</p>
          <table>
            <tbody>
            {
              lines.map((token, index) => (
                <tr key={token.id}>
                  <td style={{width: "5%"}}>
                    <label htmlFor={token.id}>{ this.getLabel(index, lines.length) }</label>
                  </td>
                  <td style={{width: "30%"}}>
                    <TextField
                      id={token.id}
                      value={token.text}
                      onChange={(event) => this.editLine(event, index)}
                      style={{width: "95%"}}
                    />
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
