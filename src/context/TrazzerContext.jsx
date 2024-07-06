import React, { useState, useEffect } from "react";
import { connectWallet, checkIfWalletIsConnected } from "../../Utils/utility";

export const TrazzerContext = React.createContext();

export const TrazzerContextProvider = ({ children }) => {
  return (
    <TrazzerContext.Provider
      value={{
        connectWallet,
        checkIfWalletIsConnected,
      }}
    >
      {children}
    </TrazzerContext.Provider>
  );
};
