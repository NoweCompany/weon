import sty from "../styles/style-components/noContentDisplay.module.css"
export default function NoContentDisplay({text}){
    return(
        <>
        
        <div className={sty.noContentDisplayContainer}>
                <h1 className={sty.noContentDisplayText}> {text} </h1>
        </div>

        </>
    )
}