import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PUBLIC_MENU_TAG } from "@/lib/menu-data";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body = await request.json();

    const { name, nameAm } = body;

    if (!name || !String(name).trim()) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const result = await prisma.category.updateMany({
      where: {
        id,
        restaurantId: session.user.restaurantId,
      },
      data: {
        name: String(name).trim(),
        nameAm: nameAm ? String(nameAm).trim() : null,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    revalidateTag(PUBLIC_MENU_TAG, "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

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

    const result = await prisma.category.deleteMany({
      where: {
        id,
        restaurantId: session.user.restaurantId,
      },
    });

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    revalidateTag(PUBLIC_MENU_TAG, "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
