import NavBar from "../components/Navbar"
import FloatNav from "../components/FloatNav"
export default function docs(){
    const buttonContent = ["Adicionar", "Deletar"];
    return(
        <>
        <FloatNav title="docs" buttonContent={buttonContent} placeholderSelect="Exportação" labelSelect="Execel" showSelect={true}/>
        <NavBar />
        </>
    )
}