import FollowButton from "@/components/FollowButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "@/components/UserTooltip";
import kyInstance from "@/lib/ky";
import { UserCountInfo, UserData } from "@/lib/types";

import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import Link from "next/link";

interface FollowersProfileDialogProps {
  user: UserData;
  initialState?: UserCountInfo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isOpenName: "followers" | "following";
}

function FollowersProfileDialog({
  user: loggedInUser,
  open,
  onOpenChange,
  isOpenName,
}: FollowersProfileDialogProps) {
  const queryClient = useQueryClient();
  const { data, isPending, isFetching } = useQuery({
    queryKey: ["follower-infos", loggedInUser.id],
    queryFn: () =>
      kyInstance
        .get(`/api/users/${loggedInUser.id}/followingfollowers`)
        .json<UserCountInfo>(),
    staleTime: Infinity,
    // initialData: initialState,
  });

  if (isPending) {
    return null;
  }
  const initial =
    isOpenName === "followers" ? data?.userFollowers : data?.userFollowing;
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        queryClient.invalidateQueries({
          queryKey: ["follower-infos", loggedInUser.id],
        });
        queryClient.invalidateQueries({
          queryKey: ["follower-info", loggedInUser.id],
        });
      }}
    >
      <DialogContent aria-describedby="Followers">
        <DialogHeader>
          <DialogTitle>
            {isOpenName === "followers" ? "Followers" : "Following"}{" "}
          </DialogTitle>
        </DialogHeader>
        {isFetching && <Loader2 className="mx-auto my-5 animate-spin" />}
        {!isFetching && (
          <div className="py-3">
            {initial?.map((user) => {
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-3 space-y-3 rounded-2xl p-2 shadow-sm hover:bg-card/50"
                >
                  <UserTooltip user={user}>
                    <Link
                      href={`/users/${user.username}`}
                      className="flex items-center gap-3"
                    >
                      <UserAvatar
                        avatarUrl={user.avatarUrl}
                        className="flex-none"
                      />
                      <div>
                        <p className="line-clamp-1 break-all font-semibold hover:underline">
                          {user.displayName}
                        </p>
                        <p className="line-clamp-1 break-all text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </Link>
                  </UserTooltip>
                  <FollowButton
                    userId={user.id}
                    initialState={{
                      followers: user._count.followers,
                      following: user._count.following,
                      isFollowedByUser: user.followers.some(
                        ({ followerId }) => followerId === loggedInUser.id,
                      ),
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default FollowersProfileDialog;
