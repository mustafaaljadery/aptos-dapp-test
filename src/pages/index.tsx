import { useState, useEffect } from 'react';
import {
  useBalance,
  useNFT,
  sendFaucet,
  useTransaction,
} from 'aptosjs';
import {
  Network,
  Provider,
  AnsClient,
  FungibleAssetClient,
} from 'aptos';

declare global {
  interface Window {
    aptos: any;
  }
}

const provider = new Provider(Network.MAINNET);
const ans = new AnsClient(provider);
const fungible = new FungibleAssetClient(provider);

export default function Home() {
  const [address, setAddress] = useState('');
  const [account, setAccount] = useState<any>(null);

  const { data, loading, error } = useTransaction({
    transactionHash:
      '0x76a74d2f015f7266e9a32fb3eb7afe90b6ddbc590f865e8a1925390b62d49c82',
    network: 'mainnet',
  });

  const init = async () => {
    if (!window.aptos) {
      return;
    } else {
      const { address, publicKey }: any =
        await window.aptos.connect();

      const value = await ans.getAddressByName('gavin');
      const f = await fungible.getPrimaryBalance(
        '0x76a74d2f015f7266e9a32fb3eb7afe90b6ddbc590f865e8a1925390b62d49c82'
      );
      console.log(value);
      console.log(f);

      setAddress(address);
    }
  };

  useEffect(() => {
    window.addEventListener('load', init);
    init();
  }, []);

  return (
    <main>
      <p>
        Account Address: <code>{address}</code>
      </p>
      <button
        onClick={() => {
          sendFaucet({
            address: address,
            network: 'devnet',
          });
        }}
      >
        test
      </button>
    </main>
  );
}
