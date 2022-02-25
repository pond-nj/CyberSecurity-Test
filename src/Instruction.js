import React from "react"

const Instruction = (props) => {

	if( props.questionNum == -1 ){
		return (
			<>
				<section className="instruciton cf">
					<p className="instruction">Please read the following instructions carefully before you start:</p>
					<h3>Instructions</h3>			
					<ol className="instruction">
						<li>Please do not click "go back" in your browser.</li>
						<li>Please do not close this page until you have completed the survey.</li>
				
						<li>You cannot modify your answer after clicking "next" button.</li>				
					</ol>
					{/*<p className="status">Loading your exercises...</p>*/ }
					<p className="status">Please press "start" to begin.</p>

					<Button
						questionNum={props.questionNum}
						onClick={props.goToNextQuestion}/>
				</section>
			</>
			)
	} else {
		return <></>
	}
}

const Button = (props) => {
	return (<button
                name="control"
                className="controlBtn ui-btn-right ui-btn ui-btn-b ui-btn-inline ui-corner-all ui-mini"
				style={{display: "inline-block"}}
                id="controlBtn-start"
                value="start"
				onClick={props.onClick}>
					Start</button>
	)
}

export default Instruction
