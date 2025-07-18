import React, { useState, useEffect } from "react";
import { Builder, isForeignAsset } from "@paraspell/sdk";
import {
  AssetTransferApi,
  constructApiPromise,
} from "@substrate/asset-transfer-api";

const Debug: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const execute = async () => {
        setIsLoaded(true);

        // const RELAY_CHAIN = "";
        // const CHAIN = "";
        // const address = "";

        // const builder =
        //   Builder(/*client | ws_url | [ws_url, ws_url,..] - Optional*/)
        //     .from(RELAY_CHAIN) //'Kusama' | 'Polkadot'
        //     .to(CHAIN) //'AssetHubPolkadot' | 'Hydration' | 'Moonbeam' | ...
        //     .currency({ symbol: "PAS", amount: "10000000000" })
        //     .address(address);

        // const tx = await builder.build();

        // //Make sure to disconnect API after it is no longer used (eg. after transaction)
        // await builder.disconnect();

        const { api, specName, safeXcmVersion } = await constructApiPromise(
          "wss://testnet-passet-hub.polkadot.io"
          // "wss://westmint-rpc.polkadot.io"
          // wss://testnet-passet-hub.polkadot.io
        );

        const assetsApi = new AssetTransferApi(api, specName, safeXcmVersion);

        const call = await assetsApi.createTransferTransaction(
          "0", // destChainId (If the destination is a relay chain put `0`)
          "5ETtpE1EC4QZQnnW7pfhD6VdCZZSEVNQn4X8Sir6fSXYgZZR", // destAddress
          ["1", "2"], // Array of AssetIds
          ["1000000000", "2000000000"], // Array of amounts of each token to transfer
          {
            format: "call",
            xcmVersion: 4,
          } // Options
        );
        console.log(call);
      };
      execute();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen min-h-screen bg-red-600"></div>
  );
};

export default Debug;
