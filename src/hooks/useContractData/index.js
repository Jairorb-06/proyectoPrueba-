import { useEffect, useState } from "react";
//import { useWeb3React } from "@web3-react/core";
//web3
// const { active, activate, deactivate, account, error, library } =
// 	useWeb3React();
const apiAlchemy = 'c7sb1O1NIBaCCcEhXX7IWpSeIf_9Qn08';//process.env.REACT_APP_ALCHEMY_KEY_MUMBAI;
//const contractPolygon = "0xfE8c6a26243B0f1533cEEA3368DC73A5AA6899b5";

const useNFTsCollection = (contractPolygon) => {
	const [nfts, setNfts] = useState([]);
	const [loadingNftsC, setLoadingNftsC] = useState(true);

	const getContractMetadata = async (contractPolygon) => {
		setLoadingNftsC(true);
		const url = `${apiAlchemy}/getNFTsForCollection?contractAddress=${contractPolygon}&withMetadata=true`;
		const options = { method: "GET", headers: { accept: "application/json" } };

		fetch(url, options)
			.then((response) => response.json())
			.then((response) => {
				setNfts(response.nfts);
				//console.log(response.nfts);
				setLoadingNftsC(false);
			})
			.catch((err) => {
				console.error(err);
				setLoadingNftsC(false);
			});
	};

	useEffect(() => {
		getContractMetadata(contractPolygon);
	}, [contractPolygon]);

	return{
		nfts,
		loadingNftsC
	};
};

const useNFTsByOwner = ({contractPolygon, account}) => {
	const [nftsAccount, setNftsAccount] = useState([]);
	const [loadingNftsO, setLoadingNftsO] = useState(true);

	const getDataNftAccount = async (account) => {
		setLoadingNftsO(true);
		//const contractPolygon = "0xfE8c6a26243B0f1533cEEA3368DC73A5AA6899b5";
		const url = `${apiAlchemy}/getNFTs?owner=${account}&contractAddresses[]=${contractPolygon}&withMetadata=true`;
		const options = { method: "GET", headers: { Accept: "application/json" } };

		fetch(url, options)
			.then((response) => response.json())
			.then((response) => {
				setNftsAccount(response.ownedNfts);
				console.log('useContractData', response.ownedNfts);
				setLoadingNftsO(false);
			})
			.catch((err) => {
				console.error(err);
				setLoadingNftsO(false);
			});
	};

	useEffect(() => {
		getDataNftAccount(account);
		
	}, [account]);

	return{
	nftsAccount,
	loadingNftsO
	};
}

const useOwnerForToken = ({addressContract, tokenId}) => {
	const [tokenIdOwner, setTokenIdOwner] = useState([]);
	const [loadingTokenIdOwner, setLoadingTokenIdOwner] = useState(true);

	const getOwnerNftContrac = async (addressContract, tokenId) => {
		setLoadingTokenIdOwner(true);
		//const contractPolygon = "0xfE8c6a26243B0f1533cEEA3368DC73A5AA6899b5";
		//fetch('https://polygon-mumbai.g.alchemy.com/nft/v2/demo/getOwnersForToken?contractAddress=0xe785E82358879F061BC3dcAC6f0444462D4b5330&tokenId=44', options)
		const url = `${apiAlchemy}/getOwnersForToken?contractAddress=${addressContract}&tokenId=${tokenId}`;
		const options = { method: "GET", headers: { Accept: "application/json" } };

		fetch(url, options)
			.then((response) => response.json())
			.then((response) => {
				setTokenIdOwner(response.owners[0]);
				//console.log(response.ownedNfts);
				setLoadingTokenIdOwner(false);
			})
			.catch((err) => {
				console.error(err);
				setLoadingTokenIdOwner(false);
			});
	};

	useEffect(() => {
		getOwnerNftContrac(addressContract, tokenId);
	}, [addressContract, tokenId]);

	return{
	tokenIdOwner,
	loadingTokenIdOwner
	};
}

const useNFTCollection = ({addressContract, tokenId}) => {
	const [dataNft, setNft] = useState([]);
	const [loadingNftC, setLoadingNftC] = useState(true);

	const getNftMetadata = async (addressContract, tokenId) => {
		setLoadingNftC(true);
		const url = `${apiAlchemy}/getNFTMetadata?contractAddress=${addressContract}&tokenId=${tokenId}&refreshCache=false`;
		const options = { method: "GET", headers: { accept: "application/json" } };

		fetch(url, options)
			.then((response) => response.json())
			.then((response) => {
				setNft(response);
				//console.log(response.nfts);
				setLoadingNftC(false);
			})
			.catch((err) => {
				console.error(err);
				setLoadingNftC(false);
			});
	};

	useEffect(() => {
		getNftMetadata(addressContract, tokenId);
	}, [addressContract, tokenId]);

	return{
		dataNft,
		loadingNftC
	};
}

export {useNFTsByOwner, useOwnerForToken, useNFTCollection };