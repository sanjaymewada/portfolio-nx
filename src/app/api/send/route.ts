import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactEmailTemplate } from '@/components/contact/email-template'
import { type ContactEmailTemplateProps } from '@/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' // ✅ Edge hata diya

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { firstName, lastName, email, message } =
    (await request.json()) as ContactEmailTemplateProps

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <no-reply@yourdomain.com>',
      to: 'your-email@gmail.com', // ✅ apna email
      subject: 'Message from portfolio contact form',
      react: ContactEmailTemplate({
        firstName,
        lastName,
        email,
        message
      })
    })

    if (error) {
      return NextResponse.json({ message: 'Error sending email' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Server Error' }, { status: 500 })
  }
}
