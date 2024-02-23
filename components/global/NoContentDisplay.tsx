import sty from "../../styles/style-components/noContentDisplay.module.css"
import Link from 'next/link';
interface Props {
    text: string
    link?: string
    linkText?: string
}
export default function NoContentDisplay(props: Props){
    const { text, link, linkText } = props
    return(
        
        <div className={sty.noContentDisplayContainer}>
            <h1 className={sty.noContentDisplayText}> {text} 
            <Link className={sty.description} href={link || "/"}>{linkText}</Link> </h1>
        </div>
    )
}