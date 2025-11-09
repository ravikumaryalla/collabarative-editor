"use server";
import { auth, clerkClient, currentUser } from "@clerk/nextjs";

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
