import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { auth } from '@/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
    const session = await auth();
    const body = await req.text();

    const signature = req.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
        return NextResponse.json(
            { error: 'Missing signature or webhook secret' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        const error = err as Error;
        console.error(`Webhook signature verification failed. ${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const eventType = event.type;
    const dataObject = event.data.object;

    try {
        switch (eventType) {
            case 'checkout.session.completed': {
                // Handle successful checkout session
                const checkoutSession = await stripe.checkout.sessions.retrieve(
                    (dataObject as Stripe.Checkout.Session).id,
                    { expand: ['line_items'] }
                );

                const customerId = checkoutSession.customer as string;
                const customer = await stripe.customers.retrieve(customerId as string) as Stripe.Customer;

                console.log(customer);
                if (customer && typeof customer === 'object' && customer.email) {
                    let user = await db.user.findUnique({
                        where: { email: customer.email },
                    });

                    if (!user) {
                        throw new Error('No user found');
                    }
                    const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription as string);


                    await db.user.update({
                        where: { id: user.id },
                        data: {
                            stripeCustomerId: customerId as string,
                            stripeSubscriptionId: checkoutSession.id,
                            stripeCurrentPeriodStart: new Date(subscription.current_period_start * 1000),
                            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                            stripeSubscriptionStatus: subscription.status,
                            priceId:
                                checkoutSession.line_items?.data[0]?.price?.id ||
                                'default_price_id',
                            hasAccess: true,
                        },
                    });

                    // TODO: Send email notification to the user
                } else {
                    console.error('No user found with the provided customer email.');
                    throw new Error('No user found');
                }

                break;
            }

            case 'customer.subscription.deleted': {
                // Handle subscription cancellation
                const checkoutSession = await stripe.checkout.sessions.retrieve(
                    (dataObject as Stripe.Checkout.Session).id,
                    { expand: ['line_items'] }
                );

                const customerId = checkoutSession.customer as string;
                const customer = await stripe.customers.retrieve(customerId as string) as Stripe.Customer;

                let user = await db.user.findUnique({
                    where: { email: customer.email as string },
                });

                if (user) {
                    await db.user.update({
                        where: { id: user.id },
                        data: { hasAccess: false },
                    });
                } else {
                    console.error(
                        'No user found associated with the canceled subscription.'
                    );
                }

                break;
            }

            default:
                console.log(`Unhandled event type: ${eventType}`);
        }
    } catch (error) {
        console.error(`Error processing ${eventType}:`, error);
    }

    return NextResponse.json({});
}
