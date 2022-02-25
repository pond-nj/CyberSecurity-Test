
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

const Buttons = ({props}) => {
    
    return(
        <div
            id="footer"
            data-role="footer"
            className="cf ui-footer ui-bar-inherit"
            role="contentinfo">
            
            {/* FOR DEBUG
            <Previous props={props}/>
            <Log props={props}/>
            */}

			<Next props = {props}/>

            {/*
            <button
                name="control"
                className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right"
                id="controlBtn-review"
                value="review">
                Review Correct Answer
            </button>
            */}

            {/*
			<button
                name="control"
                className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right"
                id="controlBtn-close"
                value="close">
                Close
            </button>*/}


            {/*
			<button
                name="control"
                className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right"
                id="controlBtn-send-result"
                value="send-result">
                Send result
            </button>*/}

            {/*
			<button
                name="control"
                className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right"
                id="controlBtn-finish"
                value="finish">
                Finish
            </button> */}

            {/*
			<button
                name="control"
                className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right"
                id="controlBtn-redo"
                value="redo">
                Redo
            </button> */}

            {/*
			<button
                name="control"
                className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-mini ui-corner-all ui-btn-icon-right"
                id="controlBtn-retry"
                value="retry">
            Retry</button>
            */}
        </div>
    )
}

export default Buttons