import Buttons from "./Buttons" 

const SurveyText = ({props}) => {
    return(<>
        <p className="question-number">
            Survey {props.surveyNum + 1} out of {props.totalSurvey}
        </p>
        <p className="question">
            {props.surveyList[props.surveyNum].textContent}
        </p>
    </>)
}

const Messages = ({props}) => {
    // console.log( props.pressSubmit )
    // console.log( props.selectedAnswer )
    const Message = (props.pressSubmit == 1 && props.selectedAnswer == -1)? "Please answer the above question." : ""

    return (<p className="messages">{Message}</p>)
}

const FeedBackChoice = ({props}) => {
    return (<>
        {[1,2,3,4,5].map( (value, index) => {
            return(
            <div className="ui-radio">
                <label
                    htmlFor={"answer-"+index}
                    className={"hovereffect ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left " + ((props.selectedAnswer==index)?"ui-radio-on":"ui-radio-off")}>
                {value}
                </label>
                <input
                    type="radio"
                    name={"answer-"+props.questionNum}
                    index={index}
                    id={"answer-"+index}
                    value={value}/>
            </div>)
        })}
    </>)
}

const Survey = ({props}) => {

    if( props.surveyNum < props.totalSurvey ){
        return(<>
            <section className="question cf">
                <SurveyText props={props}/>
                <form className="mc cf" onClick={(event) => {
                    props.setSelectedAnswer(event.target.getAttribute("index"))
                    }}>
                <FeedBackChoice props={props} />
                </form>
                <Messages props={props}/>
            </section>
            <Buttons props={props} />
        </>)
    }else {
        
        return(<>
            <section className="question cf">
                <p className="question">
                {(props.dataSubmit == -1) ?
                    "Sending Data to Server. Please do NOT close this tab." :
                    "Thank You for your cooperation. You can now close this tab."}
                </p>
            </section>
        </>)
    }
}

export default Survey