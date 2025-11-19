import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_IMAGEROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "IMAGEROUTER_API_KEY not configured" },
        { status: 500 }
      );
    }

    // Check Cloudinary configuration
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    console.log("Generating image for prompt:", prompt);

    const imageRouterUrl =
      "https://api.imagerouter.io/v1/openai/images/generations";

    const response = await fetch(imageRouterUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "stabilityai/sdxl-turbo:free",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("ImageRouter API error:", data);
      return NextResponse.json(
        {
          error: "ImageRouter API error",
          details: data.error?.message || "Unknown error",
          status: response.status,
        },
        { status: response.status }
      );
    }

    // Extract the image URL from the response
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      console.error("No image URL in response:", data);
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    console.log("Image generated, uploading to Cloudinary...");

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder: "cultureverse/batik-generations",
      resource_type: "image",
      transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
    });

    console.log("Success: Image uploaded to Cloudinary");

    return NextResponse.json({
      success: true,
      imageUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
      mimeType: "image/png",
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to generate image", details: String(error) },
      { status: 500 }
    );
  }
}

// Simple GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: "Image generation API is running",
    endpoint: "/api/image-generation",
    method: "POST",
    body: { prompt: "your prompt here" },
  });
}
