import { CLUSTER_RPC, TREASURY_ADDRESS, LMC_MINT } from './config.js';
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getMint
} from "https://esm.sh/@solana/spl-token@0.4.6";

const { Connection, PublicKey, Transaction } = solanaWeb3;

const connectBtn = document.getElementById('connectAdmin');
const adminAddr  = document.getElementById('adminAddr');
const gate       = document.getElementById('gate');
const recipientI = document.getElementById('recipient');
const amountI    = document.getElementById('lmcAmount');
const sendBtn    = document.getElementById('sendBtn');
const statusBox  = document.getElementById('status');

const connection = new Connection(CLUSTER_RPC, 'confirmed');
let provider = null;
let pubkey = null;

function checkTreasury() {
  if (pubkey !== TREASURY_ADDRESS) {
    gate.innerHTML = `<span style="color:#f87171">You are not connected as the treasury wallet. Sending is disabled.</span>`;
    sendBtn.disabled = true;
  } else {
    gate.textContent = 'Treasury verified. You can send LMC.';
    sendBtn.disabled = false;
  }
}

async function connect() {
  const w = window.solana;
  if (!w || !w.isPhantom) { alert('Install Phantom from https://phantom.app'); return; }
  try {
    const resp = await w.connect();
    provider = w;
    pubkey = resp.publicKey.toString();
    adminAddr.textContent = pubkey;
    checkTreasury();
  } catch (e) {
    console.error(e);
    adminAddr.textContent = 'Connection failed';
  }
}

async function sendLMC() {
  if (!provider) { alert('Connect treasury wallet first'); return; }
  if (pubkey !== TREASURY_ADDRESS) { alert('Only the treasury wallet can send LMC'); return; }

  try {
    const buyer = new PublicKey(recipientI.value.trim());
    const mint  = new PublicKey(LMC_MINT);
    const treasury = new PublicKey(TREASURY_ADDRESS);

    const mintInfo = await getMint(connection, mint);
    const decimals = mintInfo.decimals;

    const lmc = parseFloat(amountI.value);
    if (!lmc || lmc <= 0) { alert('Enter a valid LMC amount'); return; }
    const amountRaw = BigInt(Math.floor(lmc * (10 ** decimals)));

    const fromAta = await getAssociatedTokenAddress(mint, treasury, true);
    const toAta   = await getAssociatedTokenAddress(mint, buyer, false);

    const ix = [];
    // If buyer ATA doesn't exist, create it (treasury pays fees)
    const toInfo = await connection.getAccountInfo(toAta);
    if (!toInfo) {
      ix.push(createAssociatedTokenAccountInstruction(
        treasury, // payer
        toAta,
        buyer,
        mint
      ));
    }

    ix.push(createTransferInstruction(
      fromAta, toAta, treasury, amountRaw
    ));

    const tx = new Transaction().add(...ix);
    tx.feePayer = treasury;
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;

    const { signature } = await provider.signAndSendTransaction(tx);
    statusBox.innerHTML = `✅ Sent! <a target="_blank" href="https://explorer.solana.com/tx/${signature}?cluster=mainnet-beta">View on Explorer</a>`;
  } catch (e) {
    console.error(e);
    statusBox.textContent = '❌ Failed: ' + (e?.message ?? e);
  }
}

connectBtn.addEventListener('click', connect);
sendBtn.addEventListener('click', sendLMC);
