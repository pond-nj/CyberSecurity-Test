import React, { useState } from "react"
import Buttons from "./Buttons"


//contain question text
const DisplayText = ({props}) => {

    if( props.questionNum != -1 && props.questionNum != props.totalQuestions ){ //-1 is start menu
        return (<>
            <p className="question-number">
                Question {props.questionNum + 1} out of {props.totalQuestions}
            </p>
            <p className="question">
                {props.questionsList[props.questionNum].textContent}
            </p>
        </>)
    } 
}

//display choices
const ChoiceList = ({props}) => {
    //console.log(props)

    return(
        <form className="mc cf" onChange={(event) => {
            //selectedAnswer: yes=1, no=0, not sure=2
            //selectedValue: yes=1, no=0. not sure=0
            //must reset form selected everytime in Next button by document.getElementById("answer-*").checked="false"

            props.setSelectedAnswer(event.target.getAttribute("index"))
            console.log( (event.target.getAttribute("index").localeCompare("1")==0)? 1 : 0 )
            props.setSelectedValue( (event.target.getAttribute("index").localeCompare("1")==0)? 1 : 0 )

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
            <div className="ui-radio">
                <label
                    htmlFor={"answer-"+2}
                    className={"hovereffect ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left " + ((props.selectedAnswer==2)?"ui-radio-on":"ui-radio-off")}>
                Not Sure
                </label>
                <input
                    type="radio"
                    name={"answer-"+props.questionNum}
                    index={2}
                    id={"answer-"+2}
                    value="Not Sure"/>
            </div>
        </form>
    )
}

const Messages = ({props}) => {
    // console.log( props.pressSubmit )
    // console.log( props.selectedAnswer )
    const Message = (props.pressSubmit == 1 && props.selectedAnswer == -1)? "Please answer the above question." : ""

    return (<p className="messages">{Message}</p>)
}

const Question = ({props}) => {
    
    return(<>
        <section className="question cf">
            <p className="instruction"></p>
            <DisplayText props={props} />
            <ChoiceList props={props}/>
            <Messages props={props}/>
        </section>
        <Buttons props={props}/>
    </>)
    
}

export default Question