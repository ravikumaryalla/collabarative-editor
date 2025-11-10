"use client";
import type { InboxNotificationData } from "@liveblocks/core";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { ClientSideSuspense, useInboxNotifications } from "@liveblocks/react";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export const Inbox = () => {
  return (
    <ClientSideSuspense fallback={null}>
      {() => <InboxMenu />}
    </ClientSideSuspense>
  );
};

const InboxMenu = () => {
  const result = useInboxNotifications();

  const isError = "error" in result && !!result.error;
  const notifications: InboxNotificationData[] =
    "inboxNotifications" in result && Array.isArray(result.inboxNotifications)
      ? [...result.inboxNotifications]
      : [];
  const unreadCount = notifications.filter(
    (notification) => !notification.readAt
  ).length;
  const badgeLabel = unreadCount > 9 ? "9+" : unreadCount.toString();
  const canPaginate =
    "fetchMore" in result && "hasFetchedAll" in result && !result.hasFetchedAll;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="relative rounded-full p-0"
          size={"icon"}
        >
          <BellIcon className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-2 flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-sky-500 px-[5px] text-xs font-semibold leading-none text-white">
              {badgeLabel}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[500px] overflow-hidden p-0"
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-sm font-semibold">Inbox</span>
          {result.isLoading ? (
            <span className="text-xs text-muted-foreground">Loading…</span>
          ) : unreadCount > 0 ? (
            <span className="text-xs font-medium text-sky-500">
              {badgeLabel} unread
            </span>
          ) : null}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {result.isLoading ? (
            <div className="grid gap-2 px-4 py-6 text-sm text-muted-foreground">
              <span className="animate-pulse rounded-md bg-muted py-2" />
              <span className="animate-pulse rounded-md bg-muted py-2" />
              <span className="animate-pulse rounded-md bg-muted py-2" />
            </div>
          ) : isError ? (
            <div className="px-4 py-6 text-sm text-destructive">
              Unable to load notifications. Please try again later.
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-4 py-6 text-sm text-muted-foreground">
              You&apos;re all caught up!
            </div>
          ) : (
            <InboxNotificationList className="grid gap-1 p-2 ">
              {notifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                  href={
                    notification.roomId
                      ? `/documents/${notification.roomId}`
                      : undefined
                  }
                  className="rounded-md px-3 py-2 text-sm transition hover:bg-muted"
                />
              ))}
            </InboxNotificationList>
          )}
        </div>

        {!result.isLoading && !isError && canPaginate && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center"
              onClick={() => {
                if ("fetchMore" in result) {
                  result.fetchMore();
                }
              }}
            >
              Load more
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
