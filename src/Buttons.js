import axios from 'axios'

const Previous = ({props}) => {
    return(
        <button
            name="control"
            className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all"
            id="controlBtn-prev"
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
            id="controlBtn-next"
            value="next"
            onClick={ () => {
                if( props.selectedAnswer != -1 ){
                    props.goToNextQuestion()
                    props.resetSelected()
                    props.incrementValue(props.selectedValue)
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
        id="controlBtn-next"
        value="next"
        onClick={ () => {
            if( props.selectedAnswer != -1 ){
                props.skipQuestions(14)
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
        id="controlBtn-next"
        value="next"
        onClick={ () => {
            console.log(props.state)
        }}>
        Log
    </button>)
}

const Submit = ({props}) => {
    return(<button
        className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
        onClick={ () => {
            if( props.selectedAnswer != -1 ){
                props.updateSurveyResponse(props.selectedAnswer+1)
                props.goToNextSurvey()

                console.log( props.surveyResponse[0] )
                console.log( props.surveyResponse[1] )

                var jsondata = {"score": props.value,"brandAwareness": props.surveyResponse[0], "securityAwareness": props.selectedAnswer+1};
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
                    if(response.statusText.localeCompare("created") == 1){
                        console.log( response )
                        props.setDataSubmit(1)
                    }
                })
            } else {
                props.setSubmit(1)
            }
            
        }}
        >
        Submit
        </button>)
}

const ProceedToSurvey = ({props}) => {
    return(<button
        className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
        onClick={ () => {
            props.goToNextQuestion()
            props.goToNextSurvey()
        }}>
        Proceed
    </button>)
}

const NextSurvey = ({props}) => {
    console.log("hello")
    return(<button
        className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
        onClick={ () => {
            if( props.selectedAnswer != -1 ){
                props.goToNextSurvey()
                props.updateSurveyResponse(props.selectedAnswer+1)
            } else {
                props.setSubmit(1)
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
    } else if (props.questionNum > props.totalQuestions && props.surveyNum != props.totalSurvey - 1 ){
        return(
            <div
                id="footer"
                data-role="footer"
                className="cf ui-footer ui-bar-inherit"
                role="contentinfo">
                <NextSurvey props={props}/>
            </div>)
    } else if( props.surveyNum == props.totalSurvey - 1 ){
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