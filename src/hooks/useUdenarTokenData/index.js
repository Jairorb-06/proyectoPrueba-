import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useUdenarToken from "../useUdenarToken";

const getUdenarData = async ({ udenarToken, tokenId }) => {
  const [tokenURI, owner] = await Promise.all([
    udenarToken.methods.tokenURI(tokenId).call(),
    udenarToken.methods.ownerOf(tokenId).call(),
  ]);
  const responseMetadata = await fetch(tokenURI);
  /* 
    {tokenURI}, {
        'mode': 'cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    } 
     */

  const metadata = await responseMetadata.json();
  return {
    tokenId,
    tokenURI,
    owner,
    ...metadata,
  };
};

const useUdenarTokensData = ({ owner = null } = {}) => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { library } = useWeb3React();

  const udenarToken = useUdenarToken();

  const update = useCallback(async () => {
    if (udenarToken) {
      setLoading(true);
      let tokenIds;
      if (!library.utils.isAddress(owner)) {
        const totalSupply = await udenarToken.methods.totalSupply().call();
        tokenIds = new Array(Number(totalSupply))
          .fill()
          .map((_, index) => index);
      } else {
        const balanceOf = await udenarToken.methods.balanceOf(owner).call();
        const tokenIdsOfOwner = new Array(Number(balanceOf))
          .fill()
          .map((_, index) =>
            udenarToken.methods.tokenOfOwnerByIndex(owner, index).call()
          );
        tokenIds = await Promise.all(tokenIdsOfOwner);
      }
      const tokenPromise = tokenIds.map((tokenId) => getUdenarData({ tokenId, udenarToken })
      );
      // const Tokens = await Promise.all(tokenPromise);
      // setNFTs(Tokens);
      // setLoading(false);

      const tokenFul =  await Promise.allSettled(tokenPromise)
      const Tokens = tokenFul.filter(item =>item.status==="fulfilled").map(item => item.value);
        //   const Tokens = await Promise.all(tokenPromise);
        
      setNFTs(Tokens);
      setLoading(false);
    }
  }, [udenarToken, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    NFTs,
    update,
  };
};

const useUdenarTokenData = (tokenId = null) => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const udenarToken = useUdenarToken();

  const update = useCallback(async () => {
    if (udenarToken && tokenId != null) {
      setLoading(true);
      const toSet = await getUdenarData({ udenarToken, tokenId });
      setNFTs(toSet);
      setLoading(false);
    }
  }, [udenarToken, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    NFTs,
    update,
  };
};

export { useUdenarTokensData, useUdenarTokenData };
