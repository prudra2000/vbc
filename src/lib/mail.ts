import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                padding: 10px !important;
            }
            .content {
                padding: 10px !important;
            }
            .button {
                padding: 10px 15px !important;
                font-size: 14px !important;
            }
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td align="center">
                <table class="container" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden;">
                    <tr>
                        <td align="center" style="padding: 20px 0; background-color: #4CAF50; color: #ffffff;">
                            <h1 style="margin: 0;">VBC</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content" style="padding: 20px;">
                            <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">Hello,</p>
                            <p style="font-size: 16px; color: #333333; margin: 0 0 20px;">Thank you for signing up. Please click the button below to verify your email address.</p>
                            <p style="text-align: center;">
                                <a href="${confirmLink}" class="button" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">Verify Email</a>
                            </p>
                            <p style="font-size: 16px; color: #333333; margin: 20px 0 0;">If you did not sign up for this account, you can ignore this email.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px; background-color: #f4f4f4; color: #999999;">
                            <p style="font-size: 12px; margin: 0;">&copy; 2023 Your Company. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Please reset your password by clicking <a href="${resetLink}">here</a>.</p>`,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two-Factor Authentication",
    html: `<p>Please enter the following code to complete the authentication process: <strong>${token}</strong></p>`,
  });
};
