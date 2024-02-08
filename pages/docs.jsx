import NavBar from "../components/Navbar"
import FloatNav from "../components/FloatNav"
export default function docs(){
    const buttonContent = ["inserir"];
    return(
        <>
        <FloatNav title="docs" buttonContent={buttonContent} placeholderSelect="Exportação" labelSelect="Execel" showSelect={false}/>
        <NavBar />
        <h1>docs</h1>
        </>
    )
}