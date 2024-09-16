"use client";

import FollowersProfileButton from "@/app/(main)/users/[username]/FollowersProfileButton";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import useGetAllFollowers from "@/hooks/useGetAllFollowers";
import { FollowerInfo, UserData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface FollowerCountProps {
  user: UserData;
  initialState: FollowerInfo;
}

function FollowerCountInfo({ user, initialState }: FollowerCountProps) {
  const { data } = useFollowerInfo(user.id, initialState);

  return (
    <div>
      <FollowersProfileButton user={user} name="followers">
        Followers:{" "}
        <span className="font-semibold">{formatNumber(data.followers)}</span>
      </FollowersProfileButton>
      {" • "}
      <FollowersProfileButton user={user} name="following">
        Following:{" "}
        <span className="font-semibold">
          {formatNumber(data.following ?? 0)}
        </span>
      </FollowersProfileButton>
    </div>
  );
}

export default FollowerCountInfo;
