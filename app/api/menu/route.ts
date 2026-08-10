
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PUBLIC_MENU_TAG } from "@/lib/menu-data";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const items = await prisma.menuItem.findMany({
      where: {
        restaurantId: session.user.restaurantId,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("GET MENU ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
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

    const category = await prisma.category.count({
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

    await prisma.menuItem.create({
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
            ? true
            : Boolean(available),
        restaurantId: session.user.restaurantId,
        categoryId,
      },
    });

    revalidateTag(PUBLIC_MENU_TAG, "max");

    return NextResponse.json({ success: true }, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE MENU ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
