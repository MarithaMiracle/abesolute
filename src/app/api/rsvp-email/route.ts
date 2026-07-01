import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { google } from 'googleapis'

export const runtime = 'nodejs'

const resend = new Resend(process.env.RESEND_API_KEY)
const SHEET_ID = process.env.GOOGLE_SHEETS_ID!
const SHEET_TAB = process.env.GOOGLE_SHEETS_TAB || 'RSVPs'
const SA_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const SA_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '').replace(/\\n/g, '\n')

function toCSVRow(data: Record<string, string>) {
  const fields = [
    data['First Name'],
    data['Surname'],
    data['Email'],
    data['Phone'],
    data['Attendance'],
    data['Guest Count'],
    data['Other Guests'] || 'N/A',
    data['QR Token'] || 'N/A',
    data['Allowed Scans'] || '0',
    data['Used Scans'] || '0',
    data['Message'] || 'N/A',
    new Date().toLocaleString('en-GB'),
  ]
  return fields.map(f => `"${(f || '').replace(/"/g, '""')}"`).join(',')
}

const CSV_HEADER = '"First Name","Surname","Email","Phone","Attendance","Guest Count","Other Guests","QR Token","Allowed Scans","Used Scans","Message","Submitted At"'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const qrToken = body['Attendance'] === 'yes' ? crypto.randomUUID() : ''
    const allowedScans = body['Attendance'] === 'yes' ? Number(body['Guest Count'] || '1') : 0
    const qrUrlBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.abesolutelovestory.com'
    const qrUrl = qrToken ? `${qrUrlBase}/checkin?token=${encodeURIComponent(qrToken)}` : ''
    const qrImageUrl = qrToken ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrUrl)}` : ''

    const newRow = [
      body['First Name'],
      body['Surname'],
      body['Email'],
      body['Phone'] || 'N/A',
      body['Attendance'],
      body['Guest Count'] || '0',
      body['Other Guests'] || '0',
      qrToken || 'N/A',
      String(allowedScans),
      '0',
      body['Message'] || 'N/A',
      new Date().toLocaleString('en-GB'),
    ]

    let client
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: { client_email: SA_EMAIL, private_key: SA_KEY },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })
      client = await auth.getClient()
    } catch (err) {
      console.error('Auth failed:', err)
      return NextResponse.json({ error: 'auth-failed: check GOOGLE_SERVICE_ACCOUNT_KEY format and sheet sharing' }, { status: 500 })
    }
    const sheets = google.sheets({ version: 'v4', auth: client as any })

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `'${SHEET_TAB}'!A1`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [newRow] },
      })
    } catch (err) {
      console.error('Sheets append failed:', err)
      return NextResponse.json({ error: 'sheets-append-failed' }, { status: 500 })
    }

    let all
    try {
      all = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `'${SHEET_TAB}'!A1:L`,
      })
    } catch (err) {
      console.error('Sheets fetch failed:', err)
      return NextResponse.json({ error: 'sheets-fetch-failed' }, { status: 500 })
    }
    const headerArr = ["First Name","Surname","Email","Phone","Attendance","Guest Count","Other Guests","QR Token","Allowed Scans","Used Scans","Message","Submitted At"]
    let rows = (all.data.values || []) as string[][]

    // Filter out empty rows
    rows = rows.filter(r => r.length > 0 && r.some(c => c && c.trim().length > 0))

    // Filter out sheet header if present (check first column)
    if (rows.length > 0) {
      const firstCol = (rows[0][0] || '').toLowerCase()
      if (firstCol.includes('first name')) {
        rows = rows.slice(1)
      }
    }

    const escape = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const csvData = rows.map(r => headerArr.map((_, i) => escape(r[i] ?? '')).join(',')).join('\n')
    const csvContent = `${CSV_HEADER}\n${csvData}`
    const csvBase64 = Buffer.from(csvContent).toString('base64')

    try {
      if (body['Email']) {
        await resend.emails.send({
          from: 'Feyisayo & Temitayo <rsvp@abesolutelovestory.com>',
          to: body['Email'],
          subject: body['Attendance'] === 'yes' ? 'Your entry barcode for the wedding' : 'Thank you for your RSVP',
          html: `
            <div style="font-family:system-ui, sans-serif; color:#1f2937; line-height:1.6;">
              <p>Dear Guest,</p>
              ${body['Attendance'] === 'yes' ? `
                <p>Please present your barcode for entry:</p>
                <div style="margin:24px 0; text-align:center;">
                  <img src="${qrImageUrl}" alt="QR Code" width="160" height="160" style="border:1px solid #ddd; border-radius:10px; display:block; margin:0 auto;" />
                </div>
                <p style="font-weight:600; margin:12px 0 0;">${body['First Name']} ${body['Surname']} - Attending${body['Table no.'] || body['Seat'] ? `<br /><span style="font-size:14px; color:#4b5563;">${[body['Table no.'] ? `Table ${body['Table no.']}` : '', body['Seat'] ? `Seat ${body['Seat']}` : ''].filter(Boolean).join(' &nbsp;|&nbsp; ')}</span>` : ''}</p>
                <p style="margin:8px 0 0; font-size:14px; color:#4b5563;"><strong>Date:</strong> 4th July 2026<br /><strong>Venue:</strong> Grand Venue, Oldham OL9 6AZ<br /><strong>Guest Arrival Time:</strong> 12:00 PM</p>
                <p style="margin:20px 0 0; font-size:13px; color:#4b5563;">Kindly note this is a strictly invitation-only event. Entry is reserved for guests on the confirmed guest list, and we kindly ask that no additional plus-ones or children not included in the invitation attend.</p>
                <p style="margin:0;">We can’t wait to celebrate this special day with you!</p>
                <p style="margin:24px 0 0;">Warm regards,<br/>Feyisayo & Temitayo</p>
                <p style="margin-top:20px; font-size:13px; color:#6b7280;">If the code image does not appear, please use this link: <a href="${qrUrl}" style="color:#1E3448;">${qrUrl}</a></p>
              ` : `
                <p>Thank you for letting us know. We are sorry you are unable to attend and appreciate you confirming your RSVP.</p>
                <p style="margin:20px 0 0;">Warm regards,<br/>Feyisayo & Temitayo</p>
              `}
            </div>
          `,
        })
      }

      await resend.emails.send({
        from: 'RSVP <rsvp@abesolutelovestory.com>',
        to: process.env.CLIENT_EMAIL!,
        subject: `New RSVP — ${body['First Name']} ${body['Surname']}`,
        html: `
          <h2>New RSVP Submission</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${body['First Name']} ${body['Surname']}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${body['Email']}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd">${body['Phone'] || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Attendance</strong></td><td style="padding:8px;border:1px solid #ddd">${body['Attendance']}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Guest Count</strong></td><td style="padding:8px;border:1px solid #ddd">${body['Guest Count'] || '0'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Other Guests</strong></td><td style="padding:8px;border:1px solid #ddd">${body['Other Guests'] || '0'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>QR Token</strong></td><td style="padding:8px;border:1px solid #ddd">${qrToken || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Allowed Scans</strong></td><td style="padding:8px;border:1px solid #ddd">${allowedScans}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd">${body['Message'] || 'N/A'}</td></tr>
          </table>
          <p style="color:#888;font-size:12px">Submitted at ${new Date().toLocaleString('en-GB')}</p>
        `,
        attachments: [
          {
            filename: `rsvp-all-${Date.now()}.csv`,
            content: csvBase64,
          },
        ],
      })
    } catch (err) {
      console.error('Email send failed:', err)
      return NextResponse.json({ error: 'email-send-failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
