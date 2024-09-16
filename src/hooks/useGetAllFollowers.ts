import kyInstance from "@/lib/ky";
import { UserCountInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

function useGetAllFollowers(userId: string, initialState: UserCountInfo) {
  const query = useQuery({
    queryKey: ["follower-infos", userId],
    queryFn: () =>
      kyInstance
        .get(`/api/users/${userId}/followingfollowers`)
        .json<UserCountInfo>(),
    staleTime: Infinity,
    initialData: initialState,
  });
  return query;
}

export default useGetAllFollowers;
