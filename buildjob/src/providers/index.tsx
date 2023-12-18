import { ReactNode, Suspense } from "react";
import { RecoilRoot } from "recoil";

import { ReactQueryProvider } from "./ReactQueryProvider";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <RecoilRoot>
      <Suspense>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </Suspense>
    </RecoilRoot>
  );
}
