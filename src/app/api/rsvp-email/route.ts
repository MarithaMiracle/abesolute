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
    data['Other Guests'] || 'N/A',
    data['Message'] || 'N/A',
    new Date().toLocaleString('en-GB'),
  ]
  return fields.map(f => `"${(f || '').replace(/"/g, '""')}"`).join(',')
}

const CSV_HEADER = '"First Name","Surname","Email","Phone","Attendance","Other Guests","Message","Submitted At"'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const newRow = [
      body['First Name'],
      body['Surname'],
      body['Email'],
      body['Phone'] || 'N/A',
      body['Attendance'],
      body['Other Guests'] || 'N/A',
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
        range: `'${SHEET_TAB}'!A1:H`,
      })
    } catch (err) {
      console.error('Sheets fetch failed:', err)
      return NextResponse.json({ error: 'sheets-fetch-failed' }, { status: 500 })
    }
    const headerArr = ["First Name","Surname","Email","Phone","Attendance","Other Guests","Message","Submitted At"]
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
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Other Guests</strong></td><td style="padding:8px;border:1px solid #ddd">${body['Other Guests'] || 'N/A'}</td></tr>
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
