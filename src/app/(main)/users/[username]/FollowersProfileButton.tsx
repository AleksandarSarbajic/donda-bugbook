"use client";

import { UserData } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FollowersProfileDialog from "./FollowersProfileDialog";

interface FollowersProfileButtonProps {
  user: UserData;
  name: "followers" | "following";
  children: React.ReactNode;
}

export default function FollowersProfileButton({
  user,
  children,
  name,
}: FollowersProfileButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [isOpenName, setIsOpenName] = useState<"followers" | "following">(
    "followers",
  );
  const queryClient = useQueryClient();

  // Track the previous queryKey
  const prevQueryKeyRef = useRef(["follower-infos", user.id]);

  useEffect(() => {
    const currentQueryKey = ["follower-infos", user.id];

    if (
      JSON.stringify(prevQueryKeyRef.current) !==
      JSON.stringify(currentQueryKey)
    ) {
      queryClient.invalidateQueries({
        queryKey: prevQueryKeyRef.current,
      });

      prevQueryKeyRef.current = currentQueryKey;
    }
  }, [user.id, queryClient]);

  return (
    <>
      <span
        onClick={() => {
          setShowDialog(true);
          setIsOpenName(name);
        }}
        className="cursor-pointer"
      >
        {children}
      </span>
      <FollowersProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
        isOpenName={isOpenName}
      />
    </>
  );
}
