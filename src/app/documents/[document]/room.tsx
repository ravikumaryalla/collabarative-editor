"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_eGs4tx1y6n71iQEWXjnw_p4vfJ5u5jeuOsaWXR-ZKaJnz3j8RjWrkT4fLr6OCSjG"
      }
    >
      <RoomProvider id={params.document as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
