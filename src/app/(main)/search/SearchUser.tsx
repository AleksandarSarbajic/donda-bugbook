import FollowButton from "@/components/FollowButton";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "@/components/UserTooltip";
import { UserData } from "@/lib/types";
import { User } from "lucia";
import Link from "next/link";

interface SearchUserProps {
  user: UserData;
  loggedInUser: User;
}

function SearchUser({ user, loggedInUser }: SearchUserProps) {
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
          <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
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
}

export default SearchUser;
