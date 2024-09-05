import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  getPostDataInclude,
  getUserDataSelect,
  UserData,
  UsersData,
} from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || "";

    const searchQuery = q.split(" ").join(" & ");

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            displayName: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
        NOT: {
          id: user.id,
        },

        // followers: {
        //   none: {
        //     followerId: user.id,
        //   },
        // },
      },
      select: { ...getUserDataSelect(user.id), following: true },
      take: 5,
    });

    const data: UsersData = {
      users: users,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
