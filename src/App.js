import Header from './Header'
import Instruction from './Instruction'
import Question from './Question'
import React from 'react'
import axios from 'axios'

//import './App.css';

import XMLData from './xml/mc.xml'
import './mcstyle.css'


/*
  Problem:

    change page title

    Responder can comeback to edit choice

    collect survey on user feeling, send data to server
*/

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      questionsList: [],
      questionNum: -1, //0 to total no. of question-1, 0 is the first question
      value: 0,
      selectedValue: -1,
      selectedAnswer: -1,
      pressSubmit: 0,
      feedbackList: [] //node that contains feedback data
    }
  }

  setSubmit = (state) => {
    this.setState({
      pressSubmit: state
    })
  }

  incrementValue = (value) => {
    this.setState({
      value: this.state.value + value
    })
  }

  setSelectedValue = (value) => {
    this.setState({
      selectedValue: value
    })
  }

  resetSelected = () => {
    this.setState({
      selectedAnswer: -1,
      pressSubmit: 0
    })
  }

  goToNextQuestion = () => { 
    this.setState({
      questionNum : this.state.questionNum + 1,
      selectedAnswer: -1,
      pressSubmit: 0
    })
  }

  goToPrevQuestion = () => { this.setState({
      questionNum : this.state.questionNum - 1, 
      selectedAnswer: -1,
      pressSubmit: 0
    })
  }

  setSelectedAnswer = (answer) => { this.setState({
      selectedAnswer: answer,
      pressSubmit: 0
     })
  }

  componentDidMount(){
    this.fetchQuestionsWithAxios()
  }

  fetchQuestionsWithAxios(){
    axios.get(XMLData,
      {"Content-Type":"application/xml; charset=utf-8"
    }).then((response)=>{
      const parser = new DOMParser()
      var xml = parser.parseFromString(response.data,"text/xml")

      var questionsList = Array.from(xml.getElementsByTagName("question"))
      var feedbackList = Array.from(xml.getElementsByTagName("feedbacks"))
      console.log( feedbackList[0] )
      this.setState({
          questionsList: questionsList,
          feedbackList: feedbackList
      })
    }).catch( e => {
      console.log(e)
    })
  }

  render(){
    console.log( this.state )
    return (
      <div className="App">
        <Header/>
        <div id ="wrapper" data-role="content">
          <Instruction
            questionNum={this.state.questionNum}
            goToNextQuestion={this.goToNextQuestion}/>
          <Question
            questionNum={this.state.questionNum}
            questionsList={this.state.questionsList}
            selectedAnswer={this.state.selectedAnswer}
            selectedValue={this.state.selectedValue}
            value={this.state.value}
            pressSubmit={this.state.pressSubmit}
            totalQuestions={this.state.questionsList.length}
            feedbackList={this.state.feedbackList}
            
            goToNextQuestion={this.goToNextQuestion}
            goToPrevQuestion={this.goToPrevQuestion}
            setSelectedAnswer={this.setSelectedAnswer}
            resetSelected={this.resetSelected}
            incrementValue={this.incrementValue}
            setSelectedValue={this.setSelectedValue}
            setSubmit={this.setSubmit}
            
          />
        </div>
      </div>
    )
  }
}

export default App;
