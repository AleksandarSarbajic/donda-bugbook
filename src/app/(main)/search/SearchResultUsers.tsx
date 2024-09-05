"use client";

import FollowButton from "@/components/FollowButton";

import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "@/components/UserTooltip";
import kyInstance from "@/lib/ky";
import { UsersData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { useSession } from "../SessionProvider";

interface SearchResultsProps {
  query: string;
}

export default function SearchResultsUsers({ query }: SearchResultsProps) {
  const { user: loggedInUser } = useSession();

  const { data, isFetching, status } = useQuery({
    queryKey: ["users-feed", "search", query],
    queryFn: () =>
      kyInstance
        .get("/api/search/users", {
          searchParams: {
            q: query,
          },
        })
        .json<UsersData>(),
    staleTime: Infinity,
  });

  const users = data?.users.flatMap((page) => page) || [];

  if (status === "pending" || isFetching) {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !users.length) {
    return (
      <p className="text-center text-muted-foreground">
        No users found for this query.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading users.
      </p>
    );
  }

  console.log(users);
  return (
    <div className="mt-5">
      <h2 className="text-2xl font-bold">Users</h2>
      <div className="flex flex-col gap-5">
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 space-y-3 rounded-2xl bg-card p-5 shadow-sm hover:bg-card/90"
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
                  isFollowedByUser: user.followers.some(
                    ({ followerId }) => followerId === loggedInUser.id,
                  ),
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
