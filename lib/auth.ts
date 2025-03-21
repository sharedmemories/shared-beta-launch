import { prisma } from "./prisma";
import { resend } from "./emails/resend";
import { betterAuth } from "better-auth";
import { admin, emailOTP, organization } from "better-auth/plugins";
import { reactInvitationEmail } from "./emails/invitation-template";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getPolarSubscription } from "./polar/get-polar-subscription";
import OtpEmail from "./emails/sign-in-template";

const from = process.env.NO_REPLY_EMAIL || "delivered@resend.dev";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite"
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role during sign-up
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  plugins: [
    admin(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await resend.emails.send({
            from,
            to: email,
            subject: "Sign in verification email",
            react: OtpEmail({
              email,
              otp,
            }),
          });
        }
      },
    }),
    organization({
      allowUserToCreateOrganization: async () => {
        const subscription = await getPolarSubscription();
        return (
          subscription.subscriptionPlan === "BUSINESS" &&
          subscription.hasActiveSubscription
        );
      },
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.BETTER_AUTH_URL}/accept-invitation/${data.id}`;
        await resend.emails.send({
          from,
          to: data.email,
          subject: "You've been invited to join an organization",
          react: reactInvitationEmail({
            username: data.email,
            invitedByUsername: data.inviter.user.name,
            invitedByEmail: data.inviter.user.email,
            teamName: data.organization.name,
            inviteLink,
          }),
        });
      },
    }),
  ],
});
