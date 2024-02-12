import NavBar from "../components/Navbar"
import FloatNav from "../components/FloatNav"
import DataSideBar from "../components/DataSidebar"
export default function docs(){
    const buttonContent = ["Adicionar", "Deletar"];
    const itens = ["tabela1", "tabela2", "tabela3" ]
    return(
        <>
        <NavBar />
        <DataSideBar itens={itens}/>
        <FloatNav title="docs" buttonContent={buttonContent} placeholderSelect="Exportação" labelSelect="Execel" showSelect={true}/>
        </>
    )
}