// import TableListagem from "../components/adminComponents/TableListagem";
// import { collection } from '@/apiRequests';
// import { messaging } from "@/services";
// import { useEffect, useState } from "react";

// export default function Test() {
//     const [collectionInfo, setCollectionInfos] = useState({})

//     useEffect(() => {
//         getCollections()
//     },[])
    
//     useEffect(()=>{
//         console.log(collectionInfo)        
//     },[collectionInfo])

//     function getCollections(){
//         collection.getApi()
//             .then((info: any[] | {error: string}) => {
              
//               if(info && 'error' in info) return messaging.send(info.error, false)
      
//               setCollectionInfos(info)          
//             })
//             .catch((error) => {
//               console.log(error)
//               messaging.send(error, false)
//             })
//     }

//     return (
//         <>
//         <TableListagem />
//         </>
//     );
// }
