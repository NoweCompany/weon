import NavBar from "../components/global/Navbar"
import FloatNav from "../components/global/FloatNav"
import DataSideBar from "../components/sidebar/DataSidebar"
import NoContentDisplay from "../components/global/NoContentDisplay";
export default function docs() {
    const buttonContent = ["Adicionar", "Deletar"];
    const itens = ["tabela1", "tabela2", "tabela3", "ldjslajdlak"]
    const text = "Selecione uma tabela para começar."
    return (
        <>
            <NavBar />

            <DataSideBar itens={itens} />

            <FloatNav title="docs"
                itens={itens}
                buttonContent={buttonContent}
                placeholderSelect="Exportação"
                labelSelect="Execel"
                showSelect={true}
                showSearch={true} /> 
                
            <NoContentDisplay text={text} />

        </>
    )
}