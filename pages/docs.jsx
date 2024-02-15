import NavBar from "../components/Navbar"
import FloatNav from "../components/FloatNav"
import DataSideBar from "../components/DataSidebar"
import NoContentDisplay from "../components/NoContentDisplay";
export default function docs() {
    const buttonContent = ["Adicionar", "Deletar"];
    const itens = ["tabela1", "tabela2", "tabela3", "ldjslajdlak"]
    const text = "Selecione uma tabela para começar."
    return (
        <>
            <NavBar />
             <FloatNav title="docs"
                itens={itens}
                buttonContent={buttonContent}
                placeholderSelect="Exportação"
                labelSelect="Execel"
                showSelect={true}
                showSearch={true} /> 
            <DataSideBar itens={itens} />
            <NoContentDisplay text={text} />

        </>
    )
}