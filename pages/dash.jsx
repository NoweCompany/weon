import FloatNav from "../components/FloatNav"
import NavBar from "../components/Navbar"
import DataSideBar from "../components/DataSidebar"
import NoContentDisplay from "../components/NoContentDisplay";
export default function dash() {
    const buttonContent = ["Criar"];
    const itens = ["Dashboard", "Dashboard2", "Dashboard3", "Dashboard4" , "Dashboard4" , "Dashboard4" , "Dashboard4", "Dashboard4", "Dashboard4", "Dashboard4", "Dashboard4"]
    const text = "Selecione um Dashboard para começar."
    return (
        <>
            <NavBar />
             <FloatNav title="Dashboard"
                itens={itens}
                buttonContent={buttonContent}
                showSelect={false}
                showSearch={true} /> 
            <DataSideBar itens={itens} />
            <NoContentDisplay text={text} />

        </>
    )
}