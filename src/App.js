import Header from './Header'
import PageManager from './PageManager'
import React from 'react'
import axios from 'axios'

// import XMLData from './xml/mc.xml'
import './mcstyle.css'


/*
  Problem:

    change page title

    Responder can comeback to edit choice

    collect survey on user feeling, send data to server

    ## change survey to a new module

    ## change state that's string but is supposed to be int to int

    ## create page manager
*/

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      questionsList: [],
      feedbackList: [], //xmlnode that contains feedback data
      surveyList: [], //
      surveyForm: [],

      questionNum: -1, //0 to total no. of question-1, 0 is the first question
      surveyNum: -1,
      value: 0,
      surveyResponse: [], //save user's multiple choice response in this array
      userIndustry: "",
      userPosition: "",
      userLocation: "", //save user's text input in this array
      userComment: "",

      selectedValue: -1,
      selectedAnswer: -1,
      pressSubmit: 0,
      dataSubmit: -1
    }
  }

  setUserInput = (index, inputText) => { 
    if( index == 0) { this.setState({
      userIndustry: inputText
    })} else if( index == 1 ){ this.setState({
      userPosition: inputText
    })} else if( index == 2 ){this.setState({
      userLocation: inputText
    })} else if( index == 3 ){this.setState({
      userComment: inputText
    })}
  }

  setDataSubmit = (state) => { this.setState({
      dataSubmit: state
    })
  }

  updateSurveyResponse = (response) => { this.setState({
      surveyResponse: [...this.state.surveyResponse, parseInt(response)]
    })
  }

  goToNextSurvey = () => { this.setState({
      surveyNum: this.state.surveyNum + 1,
      selectedAnswer: -1,
      pressSubmit: 0
    })
  }

  skipQuestions = (questionNum) => { this.setState({
      questionNum: questionNum
    })
  }

  setSubmit = (state) => { this.setState({
      pressSubmit: state
    })
  }

  incrementValue = (value) => { this.setState({
      value: this.state.value + parseInt(value)
    })
  }

  setSelectedValue = (value) => { this.setState({
      selectedValue: parseInt(value)
    })
  }

  resetSelected = () => { this.setState({
      selectedAnswer: -1,
      pressSubmit: 0
    })
  }

  goToNextQuestion = () => { this.setState({
      questionNum : this.state.questionNum + 1,
      selectedAnswer: -1,
      pressSubmit: 0
    })
  }


  // goToPrevQuestion = () => { this.setState({
  //     questionNum : this.state.questionNum - 1, 
  //     selectedAnswer: -1,
  //     pressSubmit: 0
  //   })
  // }

  setSelectedAnswer = (answer) => { this.setState({
      selectedAnswer: parseInt(answer),
      pressSubmit: 0
     })
  }

  componentDidMount(){
    this.fetchQuestionsWithAxios()
  }

  fetchQuestionsWithAxios(){
    // axios.get(XMLData,
    
    axios.get("https://raw.githubusercontent.com/pond-nj/CyberSecurity-Test/main/src/xml/mc.xml",
      {"Content-Type":"application/xml; charset=utf-8"
    }).then((response)=>{
      const parser = new DOMParser()
      var xml = parser.parseFromString(response.data,"text/xml")

      var questionsList = Array.from(xml.getElementsByTagName("question"))
      var feedbackList = Array.from(xml.getElementsByTagName("feedbacks"))
      var surveyList = Array.from(xml.getElementsByTagName("surveyText"))
      var surveyForm = Array.from(xml.getElementsByTagName("surveyForm"))

      this.setState({
          questionsList: questionsList,
          feedbackList: feedbackList,
          surveyList: surveyList,
          surveyForm: surveyForm
      })
    }).catch( e => {
      console.log(e)
    })
  }

  render(){
    return (
      <div className="App">
        <Header/>
        <div id ="wrapper" data-role="content">
          <PageManager
            questionNum={this.state.questionNum}
            questionsList={this.state.questionsList}
            selectedAnswer={this.state.selectedAnswer}
            selectedValue={this.state.selectedValue}
            value={this.state.value}
            pressSubmit={this.state.pressSubmit}
            totalQuestions={this.state.questionsList.length}
            feedbackList={this.state.feedbackList}
            surveyNum={this.state.surveyNum}
            surveyList={this.state.surveyList}
            totalSurvey={this.state.surveyList.length}
            surveyResponse={this.state.surveyResponse}
            surveyForm={this.state.surveyForm}
            dataSubmit={this.state.dataSubmit}
            userIndustry={this.state.userIndustry}
            userPosition={this.state.userPosition}
            userLocation={this.state.userLocation}
            userComment={this.state.userComment}
            
            goToNextQuestion={this.goToNextQuestion}
            // goToPrevQuestion={this.goToPrevQuestion}
            setSelectedAnswer={this.setSelectedAnswer}
            resetSelected={this.resetSelected}
            incrementValue={this.incrementValue}
            setSelectedValue={this.setSelectedValue}
            setSubmit={this.setSubmit}
            skipQuestions={this.skipQuestions}
            goToNextSurvey={this.goToNextSurvey}
            updateSurveyResponse={this.updateSurveyResponse}
            setDataSubmit={this.setDataSubmit}
            setUserInput={this.setUserInput}
          />
        </div>
      </div>
    )
  }
}

export default App;
