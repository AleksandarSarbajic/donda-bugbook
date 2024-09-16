"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";

import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { UsersPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import SearchUser from "./SearchUser";
import { useSession } from "../SessionProvider";
import { Button } from "@/components/ui/button";

interface SearchResultsProps {
  query: string;
}

export default function SearchResultsUsersSecond({
  query,
}: SearchResultsProps) {
  const { user: loggedInUser } = useSession();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["users-feed", "search", query],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get("/api/search/users", {
          searchParams: {
            q: query,
            ...(pageParam ? { cursor: pageParam } : {}),
          },
        })
        .json<UsersPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    gcTime: 0,
  });

  const users =
    data?.pages
      .flatMap((page) => page.users)
      .toSorted((a, b) => {
        const aIsFollowing = a.followers.some(
          ({ followerId }) => followerId === loggedInUser.id,
        );
        const bIsFollowing = b.followers.some(
          ({ followerId }) => followerId === loggedInUser.id,
        );

        if (aIsFollowing && !bIsFollowing) return -1;
        if (!aIsFollowing && bIsFollowing) return 1;
        return 0;
      }) || [];
  console.log(users);
  if (status === "pending") {
    return <PostsLoadingSkeleton />;
  }

  if (status === "success" && !users.length && !hasNextPage) {
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

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Users</h2>
      {users.map((user) => (
        <SearchUser key={user.id} user={user} loggedInUser={loggedInUser} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
      {hasNextPage && (
        <Button
          variant={"link"}
          className="mx-auto block"
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          Load more users
        </Button>
      )}
    </div>
  );
}
