import { NextResponse } from 'next/server';
// import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify({ type: 'CONNECTED' })}\n\n`)
      );

      // Keep connection alive with a ping every 30 seconds
      const pingInterval = setInterval(() => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'PING' })}\n\n`)
        );
      }, 30000);

      // Clean up on close
      request.signal.addEventListener('abort', () => {
        clearInterval(pingInterval);
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
