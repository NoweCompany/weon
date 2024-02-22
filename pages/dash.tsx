import FloatNav from "../components/global/FloatNav"
import DataSideBar from "../components/sidebar/DataSidebar"
import NoContentDisplay from "../components/global/NoContentDisplay";
import Navbar from '../components/global/Navbar'

export default function Dash() {
    const buttonContent = ["oi"];
    const itens = ["Dashboard", "Dashboard2", "Dashboard3", "Dashboard4" , "Dashboard4" , "Dashboard4" , "Dashboard4", "Dashboard4", "Dashboard4", "Dashboard4", "Dashboard4"]
    const text = "Selecione um Dashboard para começar."
    return (
        <>
            <Navbar adminPages={true}/>
            <DataSideBar itens={itens} />
            <FloatNav title="Dashboard"
                itens={itens}
                buttonContent={buttonContent}
                showSelect={false}
                showSearch={true} /> 
            <NoContentDisplay text={text} />

        </>
    )
}