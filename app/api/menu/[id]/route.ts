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

    const existing = await prisma.menuItem.findFirst({
      where: {
        id,
        restaurantId: session.user.restaurantId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    const {
      name,
      nameAm,
      description,
      descriptionAm,
      ingredients,
      ingredientsAm,
      calories,
      protein,
      carbs,
      fat,
      price,
      image,
      categoryId,
      available,
    } = body;

    if (!name || !categoryId || price === undefined) {
      return NextResponse.json(
        {
          error: "Name, price and category are required",
        },
        { status: 400 }
      );
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        restaurantId: session.user.restaurantId,
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const item = await prisma.menuItem.update({
      where: { id },
      data: {
        name: String(name),
        nameAm: nameAm ? String(nameAm).trim() : null,
        description: description
          ? String(description)
          : null,
        descriptionAm: descriptionAm
          ? String(descriptionAm).trim()
          : null,
        ingredients: ingredients
          ? String(ingredients).trim()
          : null,
        ingredientsAm: ingredientsAm
          ? String(ingredientsAm).trim()
          : null,
        calories: calories === undefined || calories === "" || calories === null ? null : Number(calories),
        protein: protein === undefined || protein === "" || protein === null ? null : Number(protein),
        carbs: carbs === undefined || carbs === "" || carbs === null ? null : Number(carbs),
        fat: fat === undefined || fat === "" || fat === null ? null : Number(fat),
        price: Number(price),
        image: image ? String(image) : null,
        available:
          available === undefined
            ? existing.available
            : Boolean(available),
        categoryId,
      },
      include: {
        category: true,
      },
    });

    revalidateTag(PUBLIC_MENU_TAG, { expire: 0 });

    return NextResponse.json(item);
  } catch (error) {
    console.error("UPDATE MENU ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await prisma.menuItem.findFirst({
      where: {
        id,
        restaurantId: session.user.restaurantId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    const item = await prisma.menuItem.update({
      where: { id },
      data: {
        available:
          body.available === undefined
            ? existing.available
            : Boolean(body.available),
      },
    });

    revalidateTag(PUBLIC_MENU_TAG, { expire: 0 });

    return NextResponse.json(item);
  } catch (error) {
    console.error("TOGGLE MENU ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update menu item" },
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

    const existing = await prisma.menuItem.findFirst({
      where: {
        id,
        restaurantId: session.user.restaurantId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    await prisma.menuItem.delete({
      where: { id },
    });

    revalidateTag(PUBLIC_MENU_TAG, { expire: 0 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE MENU ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}
