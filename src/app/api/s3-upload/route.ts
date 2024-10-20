// import { NextResponse } from "next/server";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const s3Client = new S3Client({
//   region: process.env.NEXT_PUBLIC_AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
//   },
// });

// async function uploadImageToS3(imageBuffer: Buffer, imageName: string) {}

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const image = formData.get("file");
//     if (!image) {
//       return NextResponse.json({ error: "No image provided" }, { status: 400 });
//     }
//     if (image instanceof File) {
//       const imageBuffer = Buffer.from(await image.arrayBuffer());
//       const imageUrl = await uploadImageToS3(imageBuffer, image.name);
//     } else {
//       throw new Error("Uploaded file is not a valid image.");
//     }
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to upload image" },
//       { status: 500 }
//     );
//   }
// }
