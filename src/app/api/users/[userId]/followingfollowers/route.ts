import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect, UserCountInfo } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { userId } }: { params: { userId: string } },
) {
  try {
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [user, userFollowers] = await prisma.$transaction([
      prisma.user.findMany({
        where: {
          followers: { some: { followerId: userId } },
        },
        select: {
          ...getUserDataSelect(loggedInUser.id),
          following: true,
          followers: true,
        },
      }),
      prisma.user.findMany({
        where: {
          following: { some: { followingId: userId } },
        },
        select: {
          ...getUserDataSelect(loggedInUser.id),
          following: true,
          followers: true,
        },
      }),
    ]);

    // const user = await ;

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    const data: UserCountInfo = {
      userFollowing: user,
      userFollowers,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
