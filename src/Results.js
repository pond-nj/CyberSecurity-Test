import Buttons from "./Buttons"

const Results = ({props}) => {
    const weakThreshold = props.feedbackList[0].getElementsByTagName("weakText")[0].getAttribute("threshold")
    const moderateThreshold = props.feedbackList[0].getElementsByTagName("moderateText")[0].getAttribute("threshold")
    
    var result
    if( props.value <= weakThreshold ){ result = "weak"}
    else if( props.value <= moderateThreshold ){ result = "moderate" }
    else { result = "strong" }

    return(<>
        <section className="question cf">
            {/* <p>{props.feedbackList[0].getElementsByTagName("weakText")[0].textContent}</p> */}
            {/* <p>{props.feedbackList[0].getElementsByTagName("moderateText")[0].textContent}</p> */}
            {/* <p>{props.feedbackList[0].getElementsByTagName("strongText")[0].textContent}</p> */}
            <p>Total Score: {props.value}</p>
            <p>Your company has a {result} security!</p>
            <p>{props.feedbackList[0].getElementsByTagName(result+"Feedback")[0].textContent}</p>
            <p>Please click "Proceed" to proceed to after survey.</p>
        </section>
        <Buttons props={props}/ >
    </>)
}

export default Results
