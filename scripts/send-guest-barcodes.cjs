const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { google } = require('googleapis')
const { Resend } = require('resend')

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env')
  if (!fs.existsSync(envPath)) return

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const equalsIndex = trimmed.indexOf('=')
    if (equalsIndex === -1) continue

    const key = trimmed.slice(0, equalsIndex).trim()
    let value = trimmed.slice(equalsIndex + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    process.env[key] ||= value
  }
}

function getArg(name) {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : ''
}

function hasFlag(name) {
  return process.argv.includes(name)
}

function columnLetters(index) {
  let result = ''
  let i = index
  while (i >= 0) {
    result = String.fromCharCode(65 + (i % 26)) + result
    i = Math.floor(i / 26) - 1
  }
  return result
}

function normalizeHeader(value) {
  return String(value || '').trim().toLowerCase()
}

function findColumn(headers, names) {
  return names.reduce((found, name) => {
    if (found !== -1) return found
    return headers.indexOf(name)
  }, -1)
}

function cell(row, columns, name) {
  if (columns[name] === undefined || columns[name] < 0) return ''
  return String(row[columns[name]] || '').trim()
}

function isAttending(row, columns) {
  const value = cell(row, columns, 'attendance').toLowerCase() || cell(row, columns, 'rsvp').toLowerCase()
  if (!value) return false
  if (/\b(no|not|unable|declin|sorry)\b/.test(value)) return false
  return /\b(yes|y|attend|attending|accept|joyfully)\b/.test(value)
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmailHtml({ firstName, surname, qrImageUrl, qrUrl }) {
  const fullName = `${firstName} ${surname}`.trim() || 'Guest'

  return `
    <div style="font-family:system-ui, sans-serif; color:#1f2937; line-height:1.6;">
      <p>Dear Guest,</p>
      <p>Please present your barcode for entry:</p>
      <div style="margin:24px 0; text-align:center;">
        <img src="${escapeHtml(qrImageUrl)}" alt="QR Code" width="300" height="300" style="border:1px solid #ddd; border-radius:12px; display:block; margin:0 auto;" />
      </div>
      <p style="font-weight:600; margin:12px 0 0;">${escapeHtml(fullName)} - Attending</p>
      <p style="margin:8px 0 0; font-size:14px; color:#4b5563;"><strong>Date:</strong> 4th July 2026<br /><strong>Venue:</strong> Grand Venue, Oldham OL9 6AZ<br /><strong>Guest Arrival Time:</strong> 12:00 PM</p>
      <p style="margin:20px 0 0;">Kindly note this is a strictly invitation-only event. Entry is reserved for guests on the confirmed guest list, and we kindly ask that no additional plus-ones or children not included in the invitation attend.</p>
      <p style="margin:0;">We can't wait to celebrate this special day with you!</p>
      <p style="margin:24px 0 0;">Warm regards,<br/>Feyisayo & Temitayo</p>
      <p style="margin-top:20px; font-size:12px; color:#9ca3af;">If the code image does not appear, please use this link: <a href="${escapeHtml(qrUrl)}">${escapeHtml(qrUrl)}</a></p>
    </div>
  `
}

function usage() {
  console.log(`
Send QR barcode emails for existing RSVP rows.

Safe test examples:
  npm run send:barcodes -- --dry-run
  npm run send:barcodes -- --test-to you@example.com --row 2
  npm run send:barcodes -- --test-to you@example.com --guest-email guest@example.com

Real send:
  npm run send:barcodes -- --send-all

Notes:
  --row uses the Google Sheet row number, where row 1 is the header.
  --test-to sends the selected guest's barcode to your chosen email address.
  --send-all sends to each attending guest's Email column.
`)
}

async function main() {
  loadEnv()

  if (hasFlag('--help')) {
    usage()
    return
  }

  const dryRun = hasFlag('--dry-run')
  const sendAll = hasFlag('--send-all')
  const testTo = getArg('--test-to')
  const guestEmail = getArg('--guest-email').toLowerCase()
  const rowArg = getArg('--row')
  const sheetRowNumber = rowArg ? Number(rowArg) : 0

  if (!dryRun && !sendAll && !testTo) {
    usage()
    throw new Error('Nothing sent. Use --dry-run, --test-to, or --send-all.')
  }

  if (sendAll && testTo) {
    throw new Error('Use either --send-all or --test-to, not both.')
  }

  const requiredEnv = [
    'RESEND_API_KEY',
    'GOOGLE_SHEETS_ID',
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_SERVICE_ACCOUNT_KEY',
  ]
  const missingEnv = requiredEnv.filter(key => !process.env[key])
  if (missingEnv.length > 0) {
    throw new Error(`Missing env vars: ${missingEnv.join(', ')}`)
  }

  const sheetId = process.env.GOOGLE_SHEETS_ID
  const sheetTab = process.env.GOOGLE_SHEETS_TAB || 'RSVPs'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.abesolutelovestory.com'

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: String(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const client = await auth.getClient()
  const sheets = google.sheets({ version: 'v4', auth: client })

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `'${sheetTab}'!A1:Z`,
  })

  const rows = response.data.values || []
  if (rows.length < 2) throw new Error('The sheet has no RSVP data rows.')

  const headerValues = [...rows[0]]
  let headers = headerValues.map(normalizeHeader)
  const columns = {
    'first name': findColumn(headers, ['first name', 'firstname', 'first']),
    surname: findColumn(headers, ['surname', 'last name', 'lastname']),
    'guest name': findColumn(headers, ['guest name', 'name', 'full name', 'guest']),
    email: findColumn(headers, ['email', 'email address']),
    attendance: findColumn(headers, ['attendance', 'attending']),
    rsvp: findColumn(headers, ['rsvp']),
    'guest count': findColumn(headers, ['guest count', 'guests', 'number of guests', 'number attending']),
    'other guests': findColumn(headers, ['other guests', 'additional guests', 'plus ones']),
    'qr token': findColumn(headers, ['qr token']),
    'allowed scans': findColumn(headers, ['allowed scans']),
    'used scans': findColumn(headers, ['used scans']),
  }

  const hasSplitName = columns['first name'] >= 0 && columns.surname >= 0
  const hasGuestName = columns['guest name'] >= 0
  const hasAttendance = columns.attendance >= 0 || columns.rsvp >= 0
  const missingMinimumHeaders = []
  if (!hasSplitName && !hasGuestName) missingMinimumHeaders.push('first name/surname or guest name')
  if (columns.email < 0) missingMinimumHeaders.push('email')
  if (!hasAttendance) missingMinimumHeaders.push('attendance or rsvp')
  if (missingMinimumHeaders.length > 0) {
    throw new Error(`Missing sheet headers: ${missingMinimumHeaders.join(', ')}`)
  }

  const trackingHeaders = [
    ['qr token', 'QR Token'],
    ['allowed scans', 'Allowed Scans'],
    ['used scans', 'Used Scans'],
  ]
  const missingTrackingHeaders = trackingHeaders.filter(([name]) => columns[name] < 0)

  if (missingTrackingHeaders.length > 0) {
    const startColumn = headerValues.length
    for (const [name, label] of missingTrackingHeaders) {
      columns[name] = headerValues.length
      headerValues.push(label)
    }
    headers = headerValues.map(normalizeHeader)

    if (dryRun) {
      console.log(`Would add sheet headers: ${missingTrackingHeaders.map(([, label]) => label).join(', ')}`)
    } else {
      const endColumn = columnLetters(headerValues.length - 1)
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: `'${sheetTab}'!A1:${endColumn}1`,
        valueInputOption: 'RAW',
        requestBody: { values: [headerValues] },
      })
      console.log(`Added sheet headers starting at ${columnLetters(startColumn)}: ${missingTrackingHeaders.map(([, label]) => label).join(', ')}`)
    }
  }

  const dataRows = rows.slice(1).map((row, index) => ({
    row,
    sheetRowNumber: index + 2,
  }))

  let selectedRows = dataRows
  if (sheetRowNumber) {
    selectedRows = selectedRows.filter(target => target.sheetRowNumber === sheetRowNumber)
  }
  if (guestEmail) {
    selectedRows = selectedRows.filter(({ row }) => cell(row, columns, 'email').toLowerCase() === guestEmail)
  }

  if (selectedRows.length === 0) {
    throw new Error(sheetRowNumber ? `No row found at Google Sheet row ${sheetRowNumber}.` : 'No matching RSVP rows found.')
  }

  let targets = selectedRows.filter(({ row }) => isAttending(row, columns))
  if (testTo && !sheetRowNumber && !guestEmail) {
    targets = targets.slice(0, 1)
  }

  if (targets.length === 0) {
    const selectedSummary = selectedRows
      .slice(0, 5)
      .map(({ row, sheetRowNumber: currentSheetRow }) => {
        const name = cell(row, columns, 'guest name') || `${cell(row, columns, 'first name')} ${cell(row, columns, 'surname')}`.trim() || 'Unnamed guest'
        const attendance = cell(row, columns, 'attendance') || cell(row, columns, 'rsvp') || '(blank)'
        return `row ${currentSheetRow}: ${name}, Attendance="${attendance}"`
      })
      .join('\n')

    console.log(selectedSummary)
    throw new Error('No matching attending RSVP rows found.')
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  let sent = 0

  for (const target of targets) {
    const { row, sheetRowNumber: currentSheetRow } = target
    const guestName = cell(row, columns, 'guest name')
    const splitName = guestName ? guestName.split(/\s+/) : []
    const firstName = cell(row, columns, 'first name') || splitName.slice(0, -1).join(' ') || guestName
    const surname = cell(row, columns, 'surname') || (guestName && splitName.length > 1 ? splitName.at(-1) : '')
    const guestEmailAddress = cell(row, columns, 'email')
    const guestCountValue = cell(row, columns, 'guest count')
    const otherGuestsValue = cell(row, columns, 'other guests')
    const guestCount = guestCountValue ? Number(guestCountValue) : Number(otherGuestsValue || '0') + 1
    const allowedScans = Number.isFinite(guestCount) && guestCount > 0 ? guestCount : 1

    let qrToken = cell(row, columns, 'qr token')
    if (!qrToken || qrToken.toLowerCase() === 'n/a') {
      qrToken = crypto.randomUUID()
      if (dryRun) {
        console.log(`Would generate QR token for row ${currentSheetRow}.`)
      } else {
        const tokenColumn = columnLetters(columns['qr token'])
        await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: `'${sheetTab}'!${tokenColumn}${currentSheetRow}`,
          valueInputOption: 'RAW',
          requestBody: { values: [[qrToken]] },
        })
      }
    }

    const allowedScansColumn = columnLetters(columns['allowed scans'])
    const usedScansColumn = columnLetters(columns['used scans'])
    const existingAllowedScans = cell(row, columns, 'allowed scans')
    const existingUsedScans = cell(row, columns, 'used scans')

    if (!existingAllowedScans || existingAllowedScans.toLowerCase() === 'n/a') {
      if (dryRun) {
        console.log(`Would set Allowed Scans for row ${currentSheetRow} to ${allowedScans}.`)
      } else {
        await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: `'${sheetTab}'!${allowedScansColumn}${currentSheetRow}`,
          valueInputOption: 'RAW',
          requestBody: { values: [[String(allowedScans)]] },
        })
      }
    }

    if (!existingUsedScans || existingUsedScans.toLowerCase() === 'n/a') {
      if (dryRun) {
        console.log(`Would set Used Scans for row ${currentSheetRow} to 0.`)
      } else {
        await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: `'${sheetTab}'!${usedScansColumn}${currentSheetRow}`,
          valueInputOption: 'RAW',
          requestBody: { values: [['0']] },
        })
      }
    }

    const qrUrl = `${siteUrl}/checkin?token=${encodeURIComponent(qrToken)}`
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrUrl)}`
    const to = testTo || guestEmailAddress

    console.log(`${dryRun ? 'Would send' : 'Sending'} row ${currentSheetRow}: ${firstName} ${surname} -> ${to}`)

    if (!dryRun) {
      await resend.emails.send({
        from: 'Feyisayo & Temitayo <rsvp@abesolutelovestory.com>',
        to,
        subject: 'Your entry barcode for the wedding',
        html: buildEmailHtml({ firstName, surname, qrImageUrl, qrUrl }),
      })
      sent += 1
    }

    if (testTo) break
  }

  console.log(dryRun ? `Dry run complete. ${targets.length} attending row(s) matched.` : `Done. Sent ${sent} email(s).`)
}

main().catch(error => {
  console.error(error.message || error)
  process.exit(1)
})
