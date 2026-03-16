import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.BLOGGER_API_KEY;

  if (!API_KEY) {
    return new NextResponse("Missing BLOGGER_API_KEY", { status: 500 });
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/byurl?url=https://s0fts0rr0w.blogspot.com&key=${API_KEY}`,
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Blogger API error response:", errorText);
      return new NextResponse(
        `Blogger API error: ${res.status} - ${errorText}`,
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return new NextResponse(`Failed to fetch: ${error}`, { status: 500 });
  }
}
