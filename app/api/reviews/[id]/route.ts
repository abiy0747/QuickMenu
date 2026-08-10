import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PUBLIC_MENU_TAG } from "@/lib/menu-data";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const result = await prisma.review.deleteMany({
      where: {
        id,
        restaurantId: session.user.restaurantId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    revalidateTag(PUBLIC_MENU_TAG, "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
