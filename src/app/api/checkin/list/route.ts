import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export const runtime = 'nodejs'

const SHEET_ID = process.env.GOOGLE_SHEETS_ID!
const SHEET_TAB = process.env.GOOGLE_SHEETS_TAB || 'RSVPs'
const SA_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
const SA_KEY = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '').replace(/\\n/g, '\n')
const ADMIN_PIN = process.env.CHECKIN_ADMIN_PIN || '9999'

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (String(body?.pin || '') !== ADMIN_PIN) {
      return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 })
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
      return NextResponse.json({ success: true, guests: [] })
    }

    const headers = rows[0].map(col => String(col || '').trim().toLowerCase())
    const columns = {
      firstName: findColumn(headers, ['first name', 'firstname', 'first']),
      surname: findColumn(headers, ['surname', 'last name', 'lastname']),
      guestName: findColumn(headers, ['guest name', 'name', 'full name']),
      email: findColumn(headers, ['email', 'email address']),
      relation: findColumn(headers, ['relation']),
      tableNumber: findColumn(headers, ['table no.', 'table no', 'table number', 'table']),
      attendance: findColumn(headers, ['attendance', 'rsvp', 'attending']),
      qrToken: findColumn(headers, ['qr token']),
      allowedScans: findColumn(headers, ['allowed scans']),
      usedScans: findColumn(headers, ['used scans']),
    }

    const guests = rows.slice(1)
      .map((row, index) => {
        const fullName = cell(row, columns.guestName) || `${cell(row, columns.firstName)} ${cell(row, columns.surname)}`.trim()
        const rsvp = cell(row, columns.attendance)
        const attending = isAttending(rsvp)
        const allowedScans = Number(cell(row, columns.allowedScans) || '0')
        const usedScans = Number(cell(row, columns.usedScans) || '0')
        const safeAllowedScans = Number.isFinite(allowedScans) ? allowedScans : 0
        const safeUsedScans = Number.isFinite(usedScans) ? usedScans : 0
        const remainingScans = Math.max(0, safeAllowedScans - safeUsedScans)
        const status = !attending
          ? 'not-attending'
          : safeUsedScans >= safeAllowedScans && safeAllowedScans > 0
            ? 'checked'
            : safeUsedScans > 0
              ? 'partial'
              : 'pending'

        return {
          rowNumber: index + 2,
          name: fullName || 'Unnamed guest',
          email: cell(row, columns.email),
          relation: cell(row, columns.relation),
          tableNumber: cell(row, columns.tableNumber),
          rsvp,
          attending,
          qrReady: Boolean(cell(row, columns.qrToken)),
          allowedScans: safeAllowedScans,
          usedScans: safeUsedScans,
          remainingScans,
          status,
        }
      })
      .filter(guest => guest.name !== 'Unnamed guest' || guest.email || guest.rsvp)

    return NextResponse.json({ success: true, guests })
  } catch (error) {
    console.error('RSVP list fetch failed:', error)
    return NextResponse.json({ success: false, error: 'list-failed', message: 'Unable to load the RSVP list.' }, { status: 500 })
  }
}
