import sty from "../../styles/style-components/noContentDisplay.module.css"
import Link from 'next/link';
interface Props {
    text: string
    link?: string
    linText?: string
}
export default function NoContentDisplay(props: Props){
    const { text, link, linText } = props
    return(
        <div className={sty.noContentDisplayContainer}>
            <h1 className={sty.noContentDisplayText}> {text} 
            <Link className='text-base' href={link || "/"}>{linText}</Link> </h1>
        </div>
    )
}