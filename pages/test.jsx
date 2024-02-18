import NavBar from "../components/Navbar"
import Sidebar from "../components/AdminSidebar"
import Dataform from "../components/DataForms"
export default function test(){
    const campos = [
        "maçã", "banana", "laranja", "uva", "morango",
        "abacaxi", "kiwi", "melancia", "pêssego", "manga",
        "abacate", "ameixa", "cereja", "limão", "pera",
        "framboesa", "caju", "melão", "goiaba", "abóbora" ,
        "maçã", "banana", "laranja", "uva", "morango",
        "abacaxi", "kiwi", "melancia", "pêssego", "manga",
        "abacate", "ameixa", "cereja", "limão", "pera",
        "framboesa", "caju", "melão", "goiaba", "abóbora" ,
      ];
          return(
        <>
         <NavBar adminPages={true} /> 
        <Sidebar />
        <Dataform campos={campos}/>
        </>
    )
}