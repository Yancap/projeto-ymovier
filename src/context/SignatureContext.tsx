import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Readable } from "stream";

interface SignatureContextValues {
    signature: any;
    setSignature<T>(str: T | (() => T)): void
}

const SignatureContext = createContext({} as SignatureContextValues);

interface SignatureProviderProps{
    children: ReactNode
}
export function SignatureProvider({children}: SignatureProviderProps){
    const [ signature, setSignature ] = useState<any>(null);

    return (
        <SignatureContext.Provider value={{signature, setSignature}}>
            {children}
        </SignatureContext.Provider>
    )
}

export const useSignatureContext = () => useContext(SignatureContext)

class GetWebhook extends Readable{
    _read(size: number): void {
        
    }
}