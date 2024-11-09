import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { db } from '@/lib/db';
import { auth } from '@/auth';

const s3Client = new S3Client({
  region: process.env.REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});


async function uploadImageToS3(
  file: Buffer,
  fileName: string
): Promise<string> {
  const resizedImageBuffer = await sharp(file)
    .resize(500, 500, {
      fit: sharp.fit.cover,
      withoutEnlargement: true,
    })
    .jpeg({ quality: 100 })
    .toBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${fileName}.jpeg`, // Ensure file extension is .jpeg
    Body: resizedImageBuffer,
    ContentType: "image/jpeg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }


    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadImageToS3(
      buffer,
      Date.now() + "-" + uuid()
    );

    const fileNameWithoutExtension = fileName.split(".")[0];

    const profileImageURL = `https://digime-s3-storage.s3.us-east-1.amazonaws.com/${fileNameWithoutExtension}.jpeg`;
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    await db.user.update({
      where: { id: userId },
      data: { image: profileImageURL },
    });

    if (session?.user) {
      session.user.image = profileImageURL;
    }


    return NextResponse.json({ success: true, fileName, profileImageURL });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { message: "Error uploading image" },
      { status: 500 }
    );
  }
}
