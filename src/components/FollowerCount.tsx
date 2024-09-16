"use client";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface FollowerCountProps {
  userId: string;
  initialState: FollowerInfo;
}

function FollowerCount({ userId, initialState }: FollowerCountProps) {
  const { data } = useFollowerInfo(userId, initialState);

  return (
    <div>
      <span>
        Followers:{" "}
        <span className="font-semibold">{formatNumber(data.followers)}</span>
      </span>
      {" • "}
      <span>
        Following:{" "}
        <span className="font-semibold">
          {formatNumber(data.following ?? 0)}
        </span>
      </span>
    </div>
  );
}

export default FollowerCount;
