import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import {
  getPostDataInclude,
  getUserDataSelect,
  UserData,
  UsersData,
  UsersPage,
} from "@/lib/types";
import { NextRequest } from "next/server";

// export async function GETS(req: NextRequest) {
//   try {
//     const q = req.nextUrl.searchParams.get("q") || "";

//     const searchQuery = q.split(" ").join(" & ");

//     const { user } = await validateRequest();

//     if (!user) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const users = await prisma.user.findMany({
//       where: {
//         OR: [
//           {
//             username: {
//               contains: searchQuery,
//               mode: "insensitive",
//             },
//           },
//           {
//             displayName: {
//               contains: searchQuery,
//               mode: "insensitive",
//             },
//           },
//         ],
//         NOT: {
//           id: user.id,
//         },
//       },
//       select: { ...getUserDataSelect(user.id), following: true },
//       take: 5,
//     });

//     const data: UsersData = {
//       users: users,
//     };

//     return Response.json(data);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || "";
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const searchQuery = q.split(" ").join(" & ");

    const pageSize = 5;

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
      },
      select: { ...getUserDataSelect(user.id), following: true },
      orderBy: [
        {
          id: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = users.length > pageSize ? users[pageSize].id : null;

    const data: UsersPage = {
      users: users.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
