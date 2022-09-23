import { useCallback, useEffect, useState } from "react";
import useUdenarToken from "../useUdenarToken";

const getUdenarData = async ({udenarToken, tokenId})=>{
    const [tokenURI,
        owner
    ] = await Promise.all([
        udenarToken.methods.tokenURI(tokenId).call(),
        udenarToken.methods.ownerOf(tokenId).call()
    ])
    const responseMetadata = await fetch(tokenURI);
    const metadata = await responseMetadata.json();
    return{
        tokenId,
        tokenURI,
        owner,
        ...metadata
    }
}

/* const useUdenarTokensData=()=>{
    const [NFTs, setNFTs]= useState([]);
    const [loading, setLoading]= useState(true);
    const udenarToken = useUdenarToken();

    const update = useCallback(()=>{
        if(udenarToken){
            setLoading(true);

            setLoading(false);
        }
    })

    useEffect(()=>{
        update();
    },[update])
} */
const useUdenarTokenData=(tokenId= null)=>{
    const [NFTs, setNFTs]= useState([]);
    const [loading, setLoading]= useState(true);
    const udenarToken = useUdenarToken();

    const update = useCallback(async()=>{
        if(udenarToken && tokenId != null){
            setLoading(true);
            const toSet = await getUdenarData({ udenarToken, tokenId});
            setNFTs(toSet);
            setLoading(false);
        }
    }, [udenarToken,tokenId ])

    useEffect(()=>{
        update();
    },[update])

    return{
        loading,
        NFTs,
        update,
    }
};

export {useUdenarTokenData};