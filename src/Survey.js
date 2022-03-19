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

const UserForm = ({props}) => { //for user text input
    return(<>
        <form >
            <label htmlFor="industry"
            className=""
            >{props.surveyForm[0].getElementsByTagName("industry")[0].textContent}</label>
            <input type="text" name="industry" id="industry" value={props.userIndustry} placeholder="industry" 
            className="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"
            onChange={(event)=>{
                props.setUserInput(0,event.target.value)
            }}/>

            <label htmlFor="position"
            className=""
            >{props.surveyForm[0].getElementsByTagName("position")[0].textContent}</label>
            <input type="text" name="position" id="position" value={props.userPosition} placeholder="position"
            className="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"
            onChange={(event)=>{
                props.setUserInput(1,event.target.value)
            }}/>

            <label htmlFor="location"
            className=""
            >{props.surveyForm[0].getElementsByTagName("location")[0].textContent}</label>
            <input type="text" name="location" id="location" value={props.userLocation} placeholder="location"
            className="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"
            onChange={(event)=>{
                props.setUserInput(2,event.target.value)
            }}/>

            <label htmlFor="comment"
            className=""
            >{props.surveyForm[0].getElementsByTagName("comment")[0].textContent}</label>
            <textarea rows="8" name="comment" id="comment" value={props.userComment}
            className="ui-input-text ui-body-c ui-corner-all ui-shadow-inset"
            onChange={(event)=>{
                props.setUserInput(3,event.target.value)
            }}></textarea>
        </form>
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
    }else if( props.surveyNum == props.totalSurvey ){
        return(<>
            <section className="question cf">
                <UserForm props={props} />
            </section>
            <Buttons props={props}/>
        </>)
    } else {
        
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