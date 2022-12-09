import { connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.goerli, chain.rinkeby, chain.kovan, chain.ropsten],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    jsonRpcProvider({ rpc: (_chain) => ({ http: _chain.rpcUrls.default }) }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [wallet.metaMask({ chains, shimDisconnect: true })],
  },
  {
    groupName: 'Other',
    wallets: [
      wallet.trust({ chains, shimDisconnect: true }),
      wallet.imToken({ chains }),
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
