import { useRouter } from 'next/router';
import Dados from "../index";
import { useState } from 'react';

export default function DadosCollectionNameParam() {
    const router = useRouter();
    const { collectionName } = router.query
    const [collectionsInfos, setCollectionInfos] = useState(null);

    return (
        <>
        { 
            collectionName ? (
                <Dados collectionNameUrl={String(collectionName)} />
            ) : (
                <h1>Carregando...</h1>
            )
        }
        </>
    );
}
