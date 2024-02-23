import sty from "../../styles/style-components/loading.module.css"
export default function loading() {
    return (
        <>
            <div className={sty.spinnerContainer}>
                <div className={sty.background}></div>
                <div className={sty.spinner}></div>
            </div>        
        </>
    )
}