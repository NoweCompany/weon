import NavBar from "../components/Navbar"
import FloatNav from "../components/FloatNav"
import DataSideBar from "../components/DataSidebar"
import sty from "../styles/Style-Pages/data.module.css"
export default function docs(){
    const buttonContent = ["Adicionar", "Deletar"];
    const itens = ["tabela1", "tabela2", "tabela3" ]
    return(
        <>
        <NavBar />
        <DataSideBar itens={itens}/>
        <div className={sty.noContentDisplayContainer}>
                <h1 className={sty.noContentDisplayText}> Selecione uma tabela para começar a trabalhar</h1>
        </div>
        {/* <FloatNav title="docs" buttonContent={buttonContent} placeholderSelect="Exportação" labelSelect="Execel" showSelect={true}/> */}
        </>
    )
}