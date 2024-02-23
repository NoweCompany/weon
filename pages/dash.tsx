import FloatNav from "../components/global/FloatNav"
import DataSideBar from "../components/sidebar/DataSidebar"
import NoContentDisplay from "../components/global/NoContentDisplay";
import Navbar from '../components/global/Navbar'

export default function Dash() {
    const buttonContent = ["add"];
    const text = "Selecione um Dashboard para começar."
    return (
        <>
            <Navbar adminPages={false}/>
            {/* <DataSideBar /> */}
            <FloatNav title="Dashboard"
                // itens={itens}
                buttonContent={buttonContent}
                showSelect={false}
                showSearch={true} /> 
            <NoContentDisplay text={text} />

        </>
    )
}