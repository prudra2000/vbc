import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: NextRequest) {
  const body = await req.text();
  console.log("Request Body:", body);
  const signature = req.headers.get("stripe-signature");

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
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
  const dataObject = event.data.object as
    | Stripe.Checkout.Session
    | Stripe.Subscription;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        const checkoutSession = await stripe.checkout.sessions.retrieve(
          (dataObject as Stripe.Checkout.Session).id,
          { expand: ["line_items"] }
        );

        const customerId = checkoutSession.customer as string;
        const customer = (await stripe.customers.retrieve(
          customerId
        )) as Stripe.Customer;

        if (customer && customer.email) {
          const user = await getUserByEmail(customer.email as string);
          console.log("User:", user);

          if (user) {
            await db.user.update({
              where: { email: customer.email as string },
              data: {
                stripeCustomerId: customer.id,
                stripeSubscriptionId: checkoutSession.id,
                stripeSubscriptionStatus: checkoutSession.status,
                priceId:
                  checkoutSession.line_items?.data[0]?.price?.id ||
                  "default_price_id",
                hasAccess: true,
              },
            });
            // TODO: Send email notification to the user
          } else {
            console.error("No user found with the provided customer email.");
          }
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = dataObject as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const customer = (await stripe.customers.retrieve(
          customerId
        )) as Stripe.Customer;

        if (customer && customer.email) {
          const user = await db.user.findUnique({
            where: { email: customer.email as string },
          });

          if (user) {
            await db.user.update({
              where: { id: user.id },
              data: { hasAccess: false },
            });
          } else {
            console.error(
              "No user found associated with the canceled subscription."
            );
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.error(`Error processing ${eventType}:`, error);
    return NextResponse.json(
      { error: `Error processing ${eventType}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
