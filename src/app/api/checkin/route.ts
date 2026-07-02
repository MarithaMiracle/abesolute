import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export const runtime = 'nodejs'

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!
const SHEET_TAB = process.env.GOOGLE_SHEETS_TAB || 'RSVPs'
const SA_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const SA_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '').replace(/\\n/g, '\n')

function columnLetters(index: number) {
  let result = ''
  let i = index
  while (i >= 0) {
    result = String.fromCharCode(65 + (i % 26)) + result
    i = Math.floor(i / 26) - 1
  }
  return result
}

function isAttending(value: string) {
  const normalized = value.trim().toLowerCase()
  if (!normalized) return false
  if (/\b(no|not|unable|declin|sorry)\b/.test(normalized)) return false
  return /\b(yes|y|attend|attending|accept|joyfully)\b/.test(normalized)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = String(body?.token || '').trim()

    if (!token) {
      return NextResponse.json({ success: false, error: 'token-required', message: 'Please provide the QR token from the barcode.' }, { status: 400 })
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: SA_EMAIL, private_key: SA_KEY },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client as any })

    const all = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `'${SHEET_TAB}'!A1:Z`,
    })

    const rows = (all.data.values || []) as string[][]
    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'sheet-empty', message: 'The RSVP sheet is empty or unavailable.' }, { status: 500 })
    }

    const headerRow = rows[0].map(col => String(col || '').trim().toLowerCase())
    const tokenColumn = headerRow.findIndex(name => name === 'qr token')
    const usedScansColumn = headerRow.findIndex(name => name === 'used scans')
    const allowedScansColumn = headerRow.findIndex(name => name === 'allowed scans')
    const guestNameColumn = headerRow.findIndex(name => name === 'first name')
    const fullNameColumn = headerRow.findIndex(name => ['guest name', 'name', 'full name'].includes(name))
    const surnameColumn = headerRow.findIndex(name => name === 'surname')
    const attendanceColumn = headerRow.findIndex(name => ['attendance', 'rsvp', 'attending'].includes(name))

    if (tokenColumn < 0 || usedScansColumn < 0 || allowedScansColumn < 0) {
      return NextResponse.json({ success: false, error: 'sheet-schema-invalid', message: 'The spreadsheet headers must include QR Token, Allowed Scans, and Used Scans.' }, { status: 500 })
    }

    const dataRows = rows.slice(1)
    const matchingRows = dataRows
      .map((row, index) => ({ row, index }))
      .filter(({ row }) => String(row[tokenColumn] || '').trim() === token)
    if (matchingRows.length === 0) {
      return NextResponse.json({ success: false, error: 'token-not-found', message: 'This barcode is not recognized. Please check it and try again.' }, { status: 404 })
    }

    const allowedScans = Math.max(
      matchingRows.length,
      ...matchingRows.map(({ row }) => Number(row[allowedScansColumn] || '0')).filter(Number.isFinite)
    )
    const usedScans = Math.max(
      0,
      ...matchingRows.map(({ row }) => Number(row[usedScansColumn] || '0')).filter(Number.isFinite)
    )
    const hasAttendingGuest = matchingRows.some(({ row }) => isAttending(String(row[attendanceColumn] || '')))

    if (allowedScans <= 0 || !hasAttendingGuest) {
      return NextResponse.json({ success: false, error: 'invalid-token', message: 'This barcode is not valid for entry.' }, { status: 403 })
    }

    if (usedScans >= allowedScans) {
      return NextResponse.json({ success: false, error: 'token-exhausted', message: 'This barcode has already been used the allowed number of times.' }, { status: 403 })
    }

    const newUsedScans = usedScans + 1
    const updateColumn = columnLetters(usedScansColumn)

    await Promise.all(matchingRows.map(({ index }) => sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `'${SHEET_TAB}'!${updateColumn}${index + 2}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[String(newUsedScans)]] },
    })))

    const guestNames = matchingRows
      .map(({ row }) => String(row[fullNameColumn] || `${row[guestNameColumn] || ''} ${row[surnameColumn] || ''}`).trim())
      .filter(Boolean)
    const guestName = guestNames.length > 1 ? `${guestNames[0]} and ${guestNames.length - 1} other${guestNames.length === 2 ? '' : 's'}` : guestNames[0]
    const remainingScans = Math.max(0, allowedScans - newUsedScans)

    return NextResponse.json({
      success: true,
      guestName: guestName || 'Guest',
      allowedScans,
      usedScans: newUsedScans,
      remainingScans,
    })
  } catch (error) {
    console.error('Check-in failed:', error)
    return NextResponse.json({ success: false, error: 'checkin-failed', message: 'Unable to process the scan right now. Please try again in a moment.' }, { status: 500 })
  }
}
