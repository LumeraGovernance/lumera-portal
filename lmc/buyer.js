import { CLUSTER_RPC, TREASURY_ADDRESS, LMC_MINT, LMC_USD_PRICE } from './config.js';

const { Connection, SystemProgram, PublicKey, Transaction, LAMPORTS_PER_SOL } = solanaWeb3;

const connectBtn = document.getElementById('connectBtn');
const walletAddr = document.getElementById('walletAddr');
const lmcInput   = document.getElementById('lmcInput');
const quoteBox   = document.getElementById('quoteBox');
const buyBtn     = document.getElementById('buyBtn');
const statusBox  = document.getElementById('status');
const balEl      = document.getElementById('lmcBal');

const connection = new Connection(CLUSTER_RPC, 'confirmed');
let provider = null;
let pubkey = null;

async function getSolPriceUSD() {
  try {
    const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    const j = await r.json();
    return j.solana.usd; // number
  } catch (e) {
    // Fallback: show message and assume 1 SOL = $200 for safety
    console.warn('Price API failed, using fallback', e);
    return 200;
  }
}

async function loadBalance() {
  try {
    if (!pubkey) { balEl.textContent = '—'; return; }
    const mint = new PublicKey(LMC_MINT);
    const owner = new PublicKey(pubkey);
    const res = await connection.getParsedTokenAccountsByOwner(owner, { mint });
    const ui = res.value?.[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmount ?? 0;
    balEl.textContent = ui;
  } catch (e) {
    console.error(e);
    balEl.textContent = '—';
  }
}

async function updateQuote() {
  const lmc = parseFloat(lmcInput.value);
  if (!lmc || lmc <= 0) { quoteBox.textContent = 'Enter an amount to see SOL quote…'; return; }
  const solUsd = await getSolPriceUSD();
  const usd = lmc * LMC_USD_PRICE;
  const sol = usd / solUsd;
  quoteBox.textContent = `You’ll pay ~${sol.toFixed(6)} SOL (≈ $${usd.toFixed(2)})`;
}

async function connect() {
  const w = window.solana;
  if (!w || !w.isPhantom) { alert('Install Phantom from https://phantom.app'); return; }
  try {
    const resp = await w.connect();
    provider = w;
    pubkey = resp.publicKey.toString();
    walletAddr.textContent = pubkey;
    await loadBalance();
  } catch (e) {
    console.error(e);
    walletAddr.textContent = 'Connection failed';
  }
}

async function buy() {
  if (!provider || !pubkey) { alert('Connect your wallet first'); return; }
  const lmc = parseFloat(lmcInput.value);
  if (!lmc || lmc <= 0) { alert('Enter a valid LMC amount'); return; }

  statusBox.textContent = 'Preparing transaction…';
  try {
    const solUsd = await getSolPriceUSD();
    const usd = lmc * LMC_USD_PRICE;
    const sol = usd / solUsd;
    const lamports = Math.floor(sol * LAMPORTS_PER_SOL);

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(pubkey),
        toPubkey: new PublicKey(TREASURY_ADDRESS),
        lamports
      })
    );
    tx.feePayer = new PublicKey(pubkey);
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;

    const { signature } = await provider.signAndSendTransaction(tx);
    statusBox.innerHTML = `✅ Payment sent. <a target="_blank" href="https://explorer.solana.com/tx/${signature}?cluster=mainnet-beta">View on Explorer</a><br/>` +
                          `You will receive LMC from the treasury shortly.`;
    await connection.confirmTransaction(signature, 'confirmed');
    await loadBalance();
  } catch (e) {
    console.error(e);
    statusBox.textContent = '❌ Transaction failed: ' + (e?.message ?? e);
  }
}

connectBtn.addEventListener('click', connect);
lmcInput.addEventListener('input', updateQuote);
buyBtn.addEventListener('click', buy);
