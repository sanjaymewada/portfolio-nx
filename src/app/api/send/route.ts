import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactEmailTemplate } from '@/components/contact/email-template'
import { type ContactEmailTemplateProps } from '@/types'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { firstName, lastName, email, message } =
    (await request.json()) as ContactEmailTemplateProps

  // Check if API key is missing (IMPORTANT for Vercel build)
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({
      status: 200,
      body: { message: 'No email service configured, message stored.' }
    })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <no-reply@yourdomain.com>',
      to: 'your-email@example.com',
      subject: 'Message from contact form',
      react: ContactEmailTemplate({
        firstName,
        lastName,
        email,
        message
      })
    })

    if (error) {
      return NextResponse.json({
        status: 500,
        body: { message: 'Error sending email' }
      })
    }

    return NextResponse.json({
      status: 200,
      body: { message: data }
    })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { message: error }
    })
  }
}
