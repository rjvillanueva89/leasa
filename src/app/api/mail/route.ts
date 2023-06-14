import sgMail from "@sendgrid/mail"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

  const msg = {
    to: "rj.villanueva89@gmail.com", // Change to your verified sender
    from: "rj.villanueva89@gmail.com", // Change to your verified sender
    subject: "data.title",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  }

  sgMail.send(msg)

  return NextResponse.json({ sent: true, now: Date.now() })
}
