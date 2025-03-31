import { NextRequest, NextResponse } from 'next/server';

// This route acts as a proxy for file uploads to avoid CORS issues with direct uploads
export async function POST(req: NextRequest) {
  try {
    // Get the presigned URL from the query parameters
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    // Get the form data with the file
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload the file to R2 using the presigned URL
    const uploadResponse = await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error(
        'Upload failed:',
        errorText,
        'Status:',
        uploadResponse.status
      );
      return NextResponse.json(
        {
          error: `Failed to upload file: ${uploadResponse.status} ${uploadResponse.statusText}`,
          details: errorText,
        },
        { status: uploadResponse.status }
      );
    }

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in proxy upload:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
