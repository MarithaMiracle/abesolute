import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!
const SHEET_TAB = process.env.GOOGLE_SHEETS_TAB || 'RSVPs'
const SA_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const SA_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '').replace(/\\n/g, '\n')

function findColumn(headers: string[], names: string[]) {
  return names.reduce((found, name) => {
    if (found !== -1) return found
    return headers.indexOf(name)
  }, -1)
}

function cell(row: string[], index: number) {
  return index >= 0 ? String(row[index] || '').trim() : ''
}

function isAttending(value: string) {
  const normalized = value.trim().toLowerCase()
  if (!normalized) return false
  if (/\b(no|not|unable|declin|sorry)\b/.test(normalized)) return false
  return /\b(yes|y|attend|attending|accept|joyfully)\b/.test(normalized)
}

export async function GET(req: NextRequest) {
  try {
    const query = String(req.nextUrl.searchParams.get('q') || '').trim().toLowerCase()
    if (query.length < 2) {
      return NextResponse.json({ success: true, guests: [] })
    }

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: SA_EMAIL, private_key: SA_KEY },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client as any })

    const all = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `'${SHEET_TAB}'!A1:Z`,
    })

    const rows = (all.data.values || []) as string[][]
    if (rows.length === 0) {
      return NextResponse.json({ success: true, guests: [] })
    }

    const headers = rows[0].map(col => String(col || '').trim().toLowerCase())
    const columns = {
      firstName: findColumn(headers, ['first name', 'firstname', 'first']),
      surname: findColumn(headers, ['surname', 'last name', 'lastname']),
      guestName: findColumn(headers, ['guest name', 'name', 'full name']),
      attendance: findColumn(headers, ['attendance', 'rsvp', 'attending']),
      tableNumber: findColumn(headers, ['table no.', 'table no', 'table number', 'table']),
      seatNumber: findColumn(headers, ['seat', 'seat no.', 'seat no', 'seat number']),
    }

    const guests = rows.slice(1)
      .map((row, index) => {
        const name = cell(row, columns.guestName) || `${cell(row, columns.firstName)} ${cell(row, columns.surname)}`.trim()
        return {
          id: String(index + 2),
          name,
          tableNumber: cell(row, columns.tableNumber),
          seatNumber: cell(row, columns.seatNumber),
          attending: isAttending(cell(row, columns.attendance)),
        }
      })
      .filter(guest => guest.attending && guest.name && guest.name.toLowerCase().includes(query))
      .slice(0, 10)

    return NextResponse.json({ success: true, guests })
  } catch (error) {
    console.error('Seating search failed:', error)
    return NextResponse.json({ success: false, error: 'search-failed', message: 'Unable to search seating right now.' }, { status: 500 })
  }
}
