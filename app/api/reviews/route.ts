import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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

    const reviews = await prisma.review.findMany({
      where: {
        restaurantId: session.user.restaurantId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("GET REVIEWS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const restaurant = await prisma.restaurant.findFirst();

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    const { customerName, rating, comment } = body;

    if (!customerName || !String(customerName).trim()) {
      return NextResponse.json(
        { error: "Your name is required" },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!comment || !String(comment).trim()) {
      return NextResponse.json(
        { error: "Review text is required" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        customerName: String(customerName).trim(),
        rating: numericRating,
        comment: String(comment).trim(),
        restaurantId: restaurant.id,
      },
    });

    return NextResponse.json(review, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE REVIEW ERROR:", error);

    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
