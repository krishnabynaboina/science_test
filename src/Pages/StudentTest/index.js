import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField/TextField'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button/Button'
import _ from 'lodash'
let temperatureUnits = ['kelvin', 'celsius', 'fahrenheit', 'rankine']
let volumesConversions = ['liters', 'tableSpoons', 'cups', 'gallons']
const questionsLimit = 10
const fields = [
  {
    label: 'Input Value',
    key: 'input',
    type: 'textField',
    inputType: 'number',
    isRequired: true
  },
  {
    label: 'Units',
    key: 'units',
    type: 'selectTag',
    isRequired: true,
    options: [...temperatureUnits, ...volumesConversions]
  },
  {
    label: 'Target Units',
    key: 'targetUnits',
    type: 'selectTag',
    isRequired: true,
    options: [...temperatureUnits, ...volumesConversions]
  },
  {
    label: 'Output Value',
    key: 'output',
    type: 'textField',
    inputType: 'number',
    isRequired: true
  },
  {
    label: 'Result',
    key: 'result',
    disabled: true,
    type: 'textField'
  }
]

const getFiled = {
  textField: TextField,
  selectTag: Select
}
const temperatureConversions = {
  fahrenheit: {
    celsius: (value) => {
      return (value - 32) * 5 / 9
    },
    kelvin: (value) => {
      return (value - 32) * 5 / 9 + 273.15
    },
    rankine: (value) => {
      return value + 459.67
    }
  },
  celsius: {
    fahrenheit: (value) => {
      return (value * 9 / 5) + 32
    }
  },
  rankine: {
    fahrenheit: (value) => {
      return value - 459.67
    }
  },
  kelvin: {
    fahrenheit: (value) => {
      return (value - 273.15) * 9 / 5 + 32
    }
  }
}

const volumeConversions = {
  liters: {
    tableSpoons: (value) => {
      return value * 67.628
    },
    cups: (value) => {
      return value * 4.167
    },
    gallons: (value) => {
      return value / 3.785
    }
  },
  tableSpoons: {
    liters: (value) => {
      return value / 67.628
    }
  },
  cups: {
    liters: (value) => {
      return value / 4.167
    }
  },
  gallons: {
    liters: (value) => {
      return value * 3.785
    }
  }
}

class StudentTest extends Component {
    state = {
      questions: [{}],
      result: {}
    }

    componentDidMount () {

    }

  onChange =(e, key, index) => {
    const {questions} = this.state

    questions[index][key] = e.target.value
    this.setState({questions})
  }

    addNextQuestion = () => {
      const {questions} = this.state
      questions.push({})
      this.setState({questions})
    }

    authorized = (questionIndex) => {
      const {questions} = this.state
      questions[questionIndex].isAuthorized = true
      this.setState({questions})
    }

    validateAllQuestions = () => {
      let {questions, result} = this.state
      questions.map((question, index) => {
        if (!question.isAuthorized)
        { return }
        result[`Q${index}`] = {status: 'Invalid', value: 0}
        if (question.units === question.targetUnits) {
          if (question.input === question.outPut) {
            result[`Q${index}`].status = 'Correct'
          } else {
            result[`Q${index}`].status = 'InCorrect'
          }
          result[`Q${index}`].value = question.outPut
          return
        }
        if (temperatureUnits.indexOf(question.units) > -1) {
          result = {...this.getStatusAndValue(temperatureConversions, 'fahrenheit', question, index)}
        } else {
          result = {...this.getStatusAndValue(volumeConversions, 'liters', question, index)}
        }
      })
      this.setState({result})
    }

    getStatusAndValue (converter, commonConverter, question, index) {
      let result = {
        [`Q${index}`]: {}
      }
      let output = 0
      try {
        output = parseFloat(question.output).toFixed(3)
      } catch (e) {
        console.log(e)
      }
      if (converter[question.units][question.targetUnits]) {
        result[`Q${index}`].value = converter[question.units][question.targetUnits](question.input)
        console.log(question, 'question')
        result[`Q${index}`].status = result[`Q${index}`].value.toFixed(3) === output ? 'Correct' : 'InCorrect'
        return result
      }
      let commonValue = converter[question.units][commonConverter](question.input)
      if (converter['liters'][question.targetUnits]) {
        result[`Q${index}`].value = converter[commonConverter][question.targetUnits](commonValue)
        result[`Q${index}`].status = result[`Q${index}`].value.toFixed(3) === output ? 'Correct' : 'InCorrect'
      } else {
        result[`Q${index}`].value = 0
        result[`Q${index}`].status = 'INValid'
      }
      return result
    }

    validate = (questionIndex) => {
      const {questions} = this.state
      let validation = _.some(fields, (field) => {
        if (field.isRequired && !_.get(questions, [questionIndex, field.key])) {
          return true
        }
        return false
      })
      return validation
    }

    render () {
      const { questions, result } = this.state
      return (
        <div>
          <h3>Questions and Answers</h3>
          {questions.map((question, index) => {
            return <div>
              <span>{`${index + 1}) `}</span>
              {fields.map(field => {
                const FieldComponent = getFiled[field.type]
                let renderFields = field.type === 'selectTag' ? <Select
                  native
                  value={question[field.key] || ''}
                  onChange={(e) => this.onChange(e, field.key, index)}
                  disabled={question.isAuthorized || field.disabled}
                >
                  <option value={''} >None</option>
                  {field.options.map(option => {
                    return <option value={option} >{option}</option>
                  })}
                </Select>
                  : <TextField
                    id={field.key}
                    label={field.label}
                    value={question[field.key] || ''}
                    onChange={(e) => this.onChange(e, field.key, index)}
                    margin='normal'
                    type={field.inputType}
                    disabled={question.isAuthorized || field.disabled}
                    style={{padding: '8px'}}
                  />
                return renderFields
              })}
              <span>{result[`Q${index}`] ? result[`Q${index}`].status : ''}</span>
              { questions.length - 1 === index && index < questionsLimit - 1 ? <Button color={'primary'} variant='raised' onClick={() => this.addNextQuestion()}>ADD</Button> : ''}
              { !question.isAuthorized ? <Button color={'primary'} variant='raised' disabled={this.validate(index)} onClick={() => this.authorized(index)}>Authorized</Button> : ''}
            </div>
          })}
          <Button color={'primary'} variant='raised' onClick={() => this.validateAllQuestions()}>SUBMIT TEST</Button>
        </div>
      )
    }
}
export default StudentTest
