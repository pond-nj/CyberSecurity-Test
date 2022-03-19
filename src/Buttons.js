import axios from 'axios'

const Previous = ({props}) => {
    return(
        <button
            name="control"
            className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all"
            id="controlBtn-blue"
            value="prev"
            onClick={props.goToPrevQuestion}>
            Previous
        </button>
    )
}

const Next = ({props}) => {
    return(
        <button
            name="control"
            className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
            id="controlBtn-blue"
            value="next"
            onClick={ () => {
                if( props.selectedAnswer != -1 ){
                    props.goToNextQuestion()
                    props.resetSelected()
                    props.incrementValue(props.selectedValue)
                    props.updateUserChoice(props.selectedValue)
                    document.getElementById("answer-0").checked="false"
                    document.getElementById("answer-1").checked="false"
                } else {
                    props.setSubmit(1)
                }
            }}>
            Next
        </button>
    )
}

const Skip = ({props}) => {
    return(<button
        name="control"
        className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
        id="controlBtn-blue"
        value="next"
        onClick={ () => {
            if( props.selectedAnswer != -1 ){
                props.skipQuestions(12)
                props.resetSelected()
                props.incrementValue(props.selectedValue)
            } else {
                props.setSubmit(1)
            }
        }}>
        Skip
    </button>)
}

const Log = ({props}) => {
    return(<button
        name="control"
        className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
        id="controlBtn-blue"
        value="next"
        onClick={ () => {
            console.log("value " + props.selectedValue)
            console.log("answer " + props.selectedAnswer)
        }}>
        Log
    </button>)
}

const Submit = ({props}) => {
    return(<button
        className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
        id="controlBtn-blue"
        onClick={ () => {

            var jsondata = {
                "score": props.value,
                "securityAwareness": props.surveyResponse[0],
                "brandAwareness": props.surveyResponse[1],
                "industry": props.userIndustry,
                "position":props.userPosition,
                "location":props.userLocation,
                "comment":props.userComment
            }

            for( var i = 0 ; i < props.userChoice.length ; i++ ){
                jsondata["Q"+(i+1)] = props.userChoice[i]
            }

            for( var i = props.userChoice.length ; i < 13 ; i++ ){
                jsondata["Q"+(i+1)] = -1
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://cybersecuritytest-f559.restdb.io/rest/survey-info",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": "621a3f2d34fd6215658589f7",
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsondata)
            }
            axios(settings).then( (response) => {
                if(response.statusText.localeCompare("Created") == 0){
                    props.setDataSubmit(1)
                    console.log( response )
                }else {
                    console.log( response ) //need update here
                }
            }).catch( e => {
                console.log(e)
            })

            props.goToNextSurvey()
        }}
        >
        Submit
        </button>)
}

const ProceedToSurvey = ({props}) => {
    return(<button
        className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
        id="controlBtn-blue"
        onClick={ () => {
            props.goToNextQuestion()
            props.goToNextSurvey()
        }}>
        Proceed
    </button>)
}

const NextSurvey = ({props}) => {
    return(<button
        className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
        id="controlBtn-blue"
        onClick={ () => {
            if( props.surveyNum < props.totalSurvey ){
                if( props.selectedAnswer != -1 ){
                    props.goToNextSurvey()
                    props.updateSurveyResponse(props.selectedAnswer+1)
                } else {
                    props.setSubmit(1)
                }
            }
        }}>
        Next
    </button>)
}



const Buttons = ({props}) => {

    if( props.questionNum < props.totalQuestions ){
        return(
            <div
                id="footer"
                data-role="footer"
                className="cf ui-footer ui-bar-inherit"
                role="contentinfo">
                
                {/* <Previous props={props}/> */}
                {/* <Log props={props}/> */}
                {/* <Skip props={props} /> */}

                <Next props = {props}/>
            </div>
        )
    }else if (props.questionNum == props.totalQuestions ){
        return(
            <div
                id="footer"
                data-role="footer"
                className="cf ui-footer ui-bar-inherit"
                role="contentinfo">
                <ProceedToSurvey props={props}/>
            </div>
        )
    } else if (props.questionNum > props.totalQuestions && props.surveyNum != props.totalSurvey ){
        return(
            <div
                id="footer"
                data-role="footer"
                className="cf ui-footer ui-bar-inherit"
                role="contentinfo">
                <NextSurvey props={props}/>
            </div>)
    } else if( props.surveyNum == props.totalSurvey ){
        return(<div
                id="footer"
                data-role="footer"
                className="cf ui-footer ui-bar-inherit"
                role="contentinfo">
                <Submit props={props}/>
            </div>)
    }

    // console.log( props.questionNum )
    // console.log( props.totalQuestions )
}

export default Buttons