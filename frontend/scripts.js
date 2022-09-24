`use strict`;

import { ethers } from "./constants/ethers-5.6.esm.min.js";
import { abi } from "./constants/contractABI.js";
import { contractAddress } from "./constants/contractAddi.js";

const wallectConnectButton = document.getElementById("btnConnect");
const storeButton = document.getElementById("store");
const returnButton = document.getElementById("blaa");
const inputReadable = document.getElementById("read");

window.addEventListener("load", function () {
  if (this.window.ethereum == undefined) {
    wallectConnectButton.innerHTML = "Install Metamask";
  } else {
    wallectConnectButton.innerHTML = "Connect";
  }
});

console.log(wallectConnectButton);

async function connect() {
  if (
    window.ethereum != undefined &&
    wallectConnectButton.innerHTML === "Connect"
  ) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    wallectConnectButton.innerHTML = "Connected";
  } else if (
    window.ethereum == undefined &&
    wallectConnectButton.innerHTML === "Install Metamask"
  ) {
    window.open("https://metamask.io/download/");
  } else {
    wallectConnectButton.innerHTML = "Not Connected";
  }
}

async function store() {
  if (window.ethereum.isConnected()) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signers = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signers);
    console.log(inputReadable.value);
    const transctionResponse = await contract.setStr(inputReadable.value);
    await transctionResponse.wait(1);
    // const c = transctionResponse.toString();
    // document.getElementById("show").value = `${c}`;
  } else {
    storeButton.value = "Reload page & connect then click again";
  }
}
async function returnStr() {
  if (window.ethereum.isConnected()) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signers = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signers);
    const transctionResponse = await contract.returnStr();
    document.getElementById("show").value = `${transctionResponse}`;
  }
}
wallectConnectButton.addEventListener("click", connect);
storeButton.addEventListener("click", store);
returnButton.addEventListener("click", returnStr);
