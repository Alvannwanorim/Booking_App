import EmailTemplate from "@/emails";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PostMail(req: NextRequest) {
  const res = await req.json();
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [res.email],
    subject: "Two Factor Authorization Code",
    react: EmailTemplate({ userFirstname: res.userFirstname }),
  });
}
