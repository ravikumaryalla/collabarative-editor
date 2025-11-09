"use client";

import { ReactNode, useEffect, useId, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { getUsersList } from "@/app/api/live-blocks-auth/action";

export function Room({ children }: { children: ReactNode }) {
  type User = {
    id?: string;
    name: string;
    avatar?: string;
  };
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsersList();

      setUsers(users);
    };
    fetchUsers();
  }, []);
  const params = useParams();
  return (
    <LiveblocksProvider
      authEndpoint={"/api/live-blocks-auth"}
      throttle={16}
      resolveUsers={({ userIds }) =>
        userIds.map((userId) => users.find((user) => user.id == userId))
      }
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;
        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filteredUsers.map((user) => user.id || "");
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.document as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
