"use client";

import { useMemo } from "react";
import { useOthers, useSelf, ClientSideSuspense } from "@liveblocks/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * Generates initials from a name (handles multiple words)
 */
const getInitials = (name: string | undefined): string => {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Gets a color based on user ID for consistent avatar backgrounds
 */
const getAvatarColor = (userId: string): string => {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-green-500",
    "bg-red-500",
  ];
  const index = userId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

export const Avatars = () => {
  const others = useOthers();
  const currentUser = useSelf();

  // Combine current user with others, ensuring no duplicates
  const allUsers = useMemo(() => {
    const userMap = new Map<
      string,
      { id: string; name: string; avatar?: string }
    >();

    // Add current user first
    if (currentUser?.info) {
      userMap.set(currentUser.id, {
        id: currentUser.id,
        name: currentUser.info.name || "Anonymous",
        avatar: currentUser.info.avatar,
      });
    }

    // Add other users (excluding current user if already added)
    others.forEach((other) => {
      if (other.info && !userMap.has(other.id)) {
        userMap.set(other.id, {
          id: other.id,
          name: other.info.name || "Anonymous",
          avatar: other.info.avatar,
        });
      }
    });

    return Array.from(userMap.values());
  }, [currentUser, others]);

  // Don't render if no users
  if (allUsers.length === 0) {
    return null;
  }

  const visibleUsers = allUsers.slice(0, 5);
  const remainingCount = allUsers.length - visibleUsers.length;

  return (
    <ClientSideSuspense fallback={null}>
      <TooltipProvider delayDuration={200}>
        <div className="flex items-center gap-3">
          {/* Overlapping avatars */}
          <div className="flex items-center -space-x-2">
            {visibleUsers.map((user, index) => (
              <Tooltip key={user.id}>
                <TooltipTrigger asChild>
                  <Avatar
                    className={cn(
                      "h-8 w-8 border-2 border-white transition-all duration-200",
                      "hover:z-20 hover:scale-110 hover:shadow-md",
                      "cursor-pointer"
                    )}
                  >
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name}
                      className="object-cover"
                    />
                    <AvatarFallback
                      className={cn(
                        "text-white text-xs font-semibold",
                        getAvatarColor(user.id)
                      )}
                    >
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {user.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Show count if more than 5 users */}
          {remainingCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-muted text-xs font-semibold text-muted-foreground hover:bg-muted/80">
                  +{remainingCount}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {remainingCount} more {remainingCount === 1 ? "user" : "users"}
              </TooltipContent>
            </Tooltip>
          )}

          {/* Separator */}
          {allUsers.length > 0 && (
            <Separator orientation="vertical" className="h-6 w-px bg-border" />
          )}
        </div>
      </TooltipProvider>
    </ClientSideSuspense>
  );
};
