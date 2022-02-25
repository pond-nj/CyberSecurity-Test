import React, { useState } from "react"
import Buttons from "./Buttons"

//contain question text
const DisplayText = ({props}) => {
    if( props.questionNum != -1 && props.questionNum != props.totalQuestions ){ //-1 is start menu
        return (<>
            <p className="question-number">Question {props.questionNum + 1} out of {props.totalQuestions}</p>
            <p className="question">{props.questionsList[props.questionNum].textContent}</p>
        </>)
    } 
}


//display choices
const ChoiceList = ({props}) => {
    //console.log(props)

    return(
        <form className="mc cf" onClick={(event) => {
            props.setSelectedAnswer(event.target.getAttribute("index"))
            props.setSelectedValue(parseInt(event.target.getAttribute("index")))
            }}>
            <div className="ui-radio">
                <label
                    htmlFor={"answer-"+1}
                    className={"hovereffect ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left " + ((props.selectedAnswer==1)?"ui-radio-on":"ui-radio-off")}>
                Yes
                </label>
                <input
                    type="radio"
                    name={"answer-"+props.questionNum}
                    index={1}
                    id={"answer-"+1}
                    value="Yes"/>
            </div>
            <div className="ui-radio">
                <label
                    htmlFor={"answer-"+0}
                    className={"hovereffect ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left " + ((props.selectedAnswer==0)?"ui-radio-on":"ui-radio-off")}>
                No
                </label>
                <input
                    type="radio"
                    name={"answer-"+props.questionNum}
                    index={0}
                    id={"answer-"+0}
                    value="No"/>
            </div>
        </form>
    )
}

const Messages = ({props}) => {
    console.log( props.pressSubmit )
    console.log( props.selectedAnswer )
    const Message = (props.pressSubmit == 1 && props.selectedAnswer == -1)? "Please answer the above question." : ""

    return (<p className="messages">{Message}</p>)
}

const Question = (props) => {
    if( props.questionNum != - 1 && props.questionNum != props.totalQuestions ){
        return(<>
            <section className="question cf">
                <p className="instruction"></p>
                <DisplayText props={props} />
                <ChoiceList props={props}/>
                <Messages props = {props}/>
            </section>

            {/*<p>Value: {props.value}</p> */}
            {/*<p>selectedValue: {props.selectedValue}</p>*/}

            <Buttons
                props={props}
            />
        </>)
    } else if( props.questionNum == props.totalQuestions ){

        
        const weakThreshold = props.feedbackList[0].getElementsByTagName("weakText")[0].getAttribute("threshold")
        const moderateThreshold = props.feedbackList[0].getElementsByTagName("moderateText")[0].getAttribute("threshold")
        
        var result
        if( props.value <= weakThreshold ){ result = "weak"
        } else if( props.value <= moderateThreshold ){ result = "moderate"
        } else { result = "strong" }

        console.log(props.feedbackList[0].getElementsByTagName("weakText")[0])
        console.log(props.feedbackList[0].getElementsByTagName("weakText")[0].textContent)

        return (<>
            <section className="question cf">
                <p>{props.feedbackList[0].getElementsByTagName("weakText")[0].textContent}</p>
                <p>{props.feedbackList[0].getElementsByTagName("moderateText")[0].textContent}</p>
                <p>{props.feedbackList[0].getElementsByTagName("strongText")[0].textContent}</p>
                <p>Total Score: {props.value}</p>
                <p>Your result is {result}</p>
                <p>{props.feedbackList[0].getElementsByTagName(result+"Feedback")[0].textContent}</p>
            </section>
        </>)
    } else { return(<></>)}
    
    
}

export default Question