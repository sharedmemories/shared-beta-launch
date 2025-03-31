import { polarApi } from '@/lib/polar';
import { NextResponse } from 'next/server';
import { getCachedSession } from '@/lib/auth-utils';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    const session = await getCachedSession();

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }
    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/confirmation?checkoutId={CHECKOUT_ID}`;
    // Create checkout session with Polar
    const checkoutSession = await polarApi.checkouts.create({
      productId,
      customerExternalId: session?.user.id,
      customerEmail: session?.user.email,
      customerName: session?.user.name,
      successUrl,
    });

    // Redirect user to the Polar checkout page
    return NextResponse.redirect(checkoutSession.url);
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
