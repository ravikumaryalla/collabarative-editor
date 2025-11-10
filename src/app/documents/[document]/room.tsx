"use client";

import { ReactNode, useEffect, useId, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import {
  getRoomDetails,
  getUsersList,
} from "@/app/api/live-blocks-auth/action";
import FullScreenLoader from "@/components/FullScreenLoader";
import { Id } from "../../../../convex/_generated/dataModel";

export function Room({ children }: { children: ReactNode }) {
  type User = {
    id?: string;
    name: string;
    avatar: string | undefined;
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
      authEndpoint={async () => {
        const authEndpoint = "/api/live-blocks-auth";
        const roomId = params.document as string;

        const response = await fetch(authEndpoint, {
          method: "POST",
          body: JSON.stringify({ room: roomId }),
        });

        return await response.json();
      }}
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
      resolveRoomsInfo={async ({ roomIds }) => {
        // Liveblocks provides string[]; convert to Convex Ids for our helper
        const convexIds = roomIds as unknown as Id<"documents">[];
        const details = await getRoomDetails(convexIds);

        // Build a lookup and return results in the same order as roomIds
        const byId = new Map(
          details.map((d) => [
            String(d.id),
            { name: d.title, url: `/documents/${String(d.id)}` },
          ])
        );
        return roomIds.map((id) => byId.get(String(id)));
      }}
    >
      <RoomProvider
        id={params.document as string}
        initialStorage={{
          leftMargin: 56,
          rightMargin: 56,
        }}
      >
        <ClientSideSuspense fallback={<FullScreenLoader />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
