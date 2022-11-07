import React, { useState, useEffect, useContext } from "react";
import NFT from "../arctifacts/contracts/MyNFT2.sol/MyNFT2.json";
import { BallTriangle } from "react-loader-spinner";
import ConnectWalletContext from "../Contexts/ConnectWalletContext";

import { ethers } from "ethers";
import { Link } from "react-router-dom";
import Field from "./tailwind_sceens/Forms";
import Anchor from "./tailwind_sceens/Anchor";
import { contractAddress2 } from "../important/ContractAddress";

export default function MyNFTScreen2() {
  const {
    checkWalletIsConnected,
    connectWalletHandler,
    walletConnectionDetails,
    walletListener,
  } = useContext(ConnectWalletContext);

  const [walletConnectStatus, setWalletConnectStatus] = useState(
    walletConnectionDetails.status
  );
  const [loadingState, setLoadingState] = useState(0);
  const [mintStatus, setMintStatus] = useState(0);
  const [mintedNFT, setMintedNft] = useState(null);

  const [urlValue, setUrlValue] = useState("");
  const [urlErrorValue, setUrlErrorValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [addressErrorValue, setAddressErrorValue] = useState("");

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      await checkWalletIsConnected();
      if (walletConnectionDetails.status === true) {
        setWalletConnectStatus(walletConnectionDetails.status);
      }
    };
    checkIfWalletIsConnected();
  }, [walletConnectionDetails.status]);

  const mintCharacter = async () => {
    try {
      const { ethereum } = window;
      let nftContract;
      let errorStatus = 0;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        nftContract = new ethers.Contract(contractAddress2, NFT.abi, signer);

        if (addressValue === "") {
          setAddressErrorValue("An ethereum public address is required");
          errorStatus = 1;
        }

        if (urlValue === "") {
          setUrlErrorValue("Token URI is required");
          errorStatus = 1;
        }
        if (parseFloat(errorStatus) == parseFloat(1)) {
          return;
        }

        let nftTx = await nftContract.mintNFT(addressValue, urlValue);
        console.log("Minig....", nftTx.hash);
        setLoadingState(0);
        console.log(nftContract);
        let tx = await nftTx.wait();

        console.log("Mined!", tx);
        setLoadingState(1);

        let event = tx.events[0];
        let value = event.args[2];
        let tokenId = value.toNumber();

        getMintedNFT(tokenId);
      } else {
        setMintStatus(true);
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMintedNFT = async (tokenId) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(
          contractAddress2,
          NFT.abi,
          signer
        );

        //call the function that returns the token uri
        let tokenUri = await nftContract.tokenURI(tokenId);

        setMintedNft(tokenUri);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const reUpdateWalletStatus = async () => {
      await walletListener();
      setWalletConnectStatus(walletConnectionDetails.status);
    };
    reUpdateWalletStatus();
  }, [walletConnectionDetails.status]);

  return (
    <>
      <div className="bg-slate-900 h-screen mt-0 pt-40">
        <div className="shadow-lg border font-light border-solid rounded-sm py-12 px-8 w-4/5 my-auto mx-auto bg-white">
          <h1 className="text-2xl md:text-4xl text-gray-800 mb-3">Mint NFT</h1>
          <p className="text-gray-600">
            A simple smart contract for swift minting of NFTs
          </p>

          {loadingState === 0 ? (
            <div className="flex flex-col justify-center items-center">
              <div className="text-lg font-bold mt-4">
                Click the `Mint NFT` Button below to mint NFTs
              </div>
              <BallTriangle
                className="flex justify-center items-center pt-12"
                type="TailSpin"
                color="#d3d3d3"
                height={40}
                width={40}
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <div className="font-semibold text-lg text-center mb-4">
                Your Eternal Domain Characters
              </div>
              {/* <img
                        src={`${mintedNFT}`}
                        alt=''
                        className='h-60 w-60 rounded-lg shadow-2xl shadow-[#6FFFE9] hover:scale-105 transition duration-500 ease-in-out'
                    /> */}
              <div className="h-60 w-60 rounded-lg shadow-2xl shadow-[#6FFFE9] hover:scale-105 transition duration-500 ease-in-out">
                <div className="w-full text-center mt-14">
                  {/* <Anchor href={mintedNFT} target="_blank" className="w-full text-center mt-10" >Click To View NFT</a> */}
                  <Anchor href={mintedNFT} color="primary" target="_blank">
                    Click To View NFT
                  </Anchor>
                </div>
              </div>
            </div>
          )}
          <div className="mt-4">
            {walletConnectStatus === true ? (
              <>
                <div className="w-4/5">
                  <Field
                    error={urlErrorValue}
                    value={urlValue}
                    onChange={(e) => {
                      setUrlValue(e.target.value);
                      setUrlErrorValue("");
                    }}
                    id="urlValue"
                    label="Token URI"
                    name="name"
                    placeholder="Token URI"
                    dot
                  />
                </div>
                <div className="w-4/5 mt-4 mb-4">
                  <Field
                    error={addressErrorValue}
                    value={addressValue}
                    onChange={(e) => {
                      setAddressValue(e.target.value);
                      setAddressErrorValue("");
                    }}
                    id="addressValue"
                    label="Ethereum Public Address"
                    name="name"
                    placeholder="Ethereum Public Address"
                    dot
                  />
                </div>

                <button
                  onClick={() => mintCharacter()}
                  className="text-white focus:outline-none shadow rounded px-6 py-2 font-medium transition ease-in duration-200 bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:ring-offset-green-100"
                >
                  Mint NFT
                </button>

                <Link
                  className="ml-4 text-white focus:outline-none shadow rounded px-6 py-2 font-medium transition ease-in duration-200 bg-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100"
                  to="/"
                >
                  Home
                </Link>
              </>
            ) : (
              <Link
                className="ml-4 text-white focus:outline-none shadow rounded px-6 py-2 font-medium transition ease-in duration-200 bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:ring-offset-green-100"
                to="/my_nft_screen"
              >
                Home
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
