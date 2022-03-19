import Buttons from "./Buttons"

const Results = ({props}) => {
    const weakThreshold = props.feedbackList[0].getElementsByTagName("weakText")[0].getAttribute("threshold")
    const moderateThreshold = props.feedbackList[0].getElementsByTagName("moderateText")[0].getAttribute("threshold")
    
    var result
    if( props.value <= weakThreshold ){ result = "weak"}
    else if( props.value <= moderateThreshold ){ result = "moderate" }
    else { result = "strong" }

    const parseBR = (text) => {
        var br = "<br/ >";
        const textArr = text.split(br)
        return textArr.map((line, index) => {
            if( index != textArr.length-1 ) return  (<> {line} <br key={"key_" + index} /> </>)
            else return (<>{line}</>)
        })
    }

    const listArr = Array.from(props.feedbackList[0].getElementsByTagName(result+"Feedback")[0].getElementsByTagName("li")).map((line,index)=>{
        return <li key={"key_"+index}>{parseBR(line.textContent)}</li>
    })

    return(<>
        <section className="question cf">
            {/* <p>{props.feedbackList[0].getElementsByTagName("weakText")[0].textContent}</p> */}
            {/* <p>{props.feedbackList[0].getElementsByTagName("moderateText")[0].textContent}</p> */}
            {/* <p>{props.feedbackList[0].getElementsByTagName("strongText")[0].textContent}</p> */}
            <p>Total Score: {props.value}</p>
            <p>Your company has a {result} security!</p>
            <p>{parseBR(props.feedbackList[0].getElementsByTagName(result+"Feedback")[0].getElementsByTagName("head")[0].textContent)}</p>
            <ul>
                {listArr}
            </ul>
            <p>The survey has not ended yet. Please click "Proceed" to continue the survey.</p>
        </section>
        <Buttons props={props}/ >
    </>)
}

export default Results
