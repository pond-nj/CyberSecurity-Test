import Question from './Question'
import Instruction from './Instruction'
import Results from './Results'
import Survey from './Survey'


const PageManager = (props) => {
    if( props.questionNum == -1 ){
        return(<Instruction props={props}/>)
    } else if( props.questionNum != - 1 && props.questionNum < props.totalQuestions ){
        return(
            <Question props={props}/>)
    } else if( props.questionNum == props.totalQuestions ){
        return (
            <Results props={props}/>)
    } else if ( props.questionNum > props.totalQuestions ){
        return (
            <Survey props={props}/>)
    } else { return( <></>) }
}

export default PageManager
