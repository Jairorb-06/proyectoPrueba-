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

const useUdenarTokensData=()=>{
    const [NFTs, setNFTs]= useState([]);
    const [loading, setLoading]= useState(true);

    const udenarToken = useUdenarToken();

    const update = useCallback(async()=>{
        if(udenarToken){
            setLoading(true);
            let tokenIds;

            const totalSupply = await udenarToken.methods.totalSupply().call();
            tokenIds = new Array(Number(totalSupply)).fill().map((_, index)=>index);

            const tokenPromise= tokenIds.map((tokenId)=> getUdenarData({tokenId, udenarToken}))
            
            const Tokens = await Promise.all(tokenPromise);

            setNFTs(Tokens);
            setLoading(false);
        }
    }, [udenarToken])

    useEffect(()=>{
        update();
    },[update]);

    return{
        loading,
        NFTs,
        update,
    }
}

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

export {useUdenarTokensData, useUdenarTokenData};