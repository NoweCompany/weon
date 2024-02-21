import sty from "../../styles/style-components/noContentDisplay.module.css"

interface Props {
    text: string
}
export default function NoContentDisplay(props: Props){
    const { text } = props
    return(
        <>
        
        <div className={sty.noContentDisplayContainer}>
                <h1 className={sty.noContentDisplayText}> {text} </h1>
        </div>

        </>
    )
}