import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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

    const existing = await prisma.review.findFirst({
      where: {
        id,
        restaurantId: session.user.restaurantId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE REVIEW ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
