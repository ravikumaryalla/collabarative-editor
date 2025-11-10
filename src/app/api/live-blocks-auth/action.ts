"use server";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const convexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const getRoomDetails = async (roomIds: Id<"documents">[]) => {
  const roomDetails = await convexClient.query(api.document.getByIds, {
    ids: roomIds,
  });
  return roomDetails;
};

export const getUsersList = async () => {
  const { sessionClaims } = await auth();

  if (!sessionClaims?.org_id) {
    return [];
  }

  const orgMembers =
    await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: sessionClaims.org_id,
    });
  const users = orgMembers.map((member) => {
    return {
      id: member.publicUserData?.userId,
      name: member.publicUserData?.firstName ?? "Anonymous",
      avatar: member.publicUserData?.imageUrl,
    };
  });
  return users ?? [];
};
