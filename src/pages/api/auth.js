import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Csak POST kérések engedélyezettek' });
  }

  try {
    const { email } = req.body;

    // Google Sheets API beállítása
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Email címek lekérése a táblázatból
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'C:C', // A C oszlop, ahol az email címek vannak
    });

    const rows = response.data.values || [];
    const emails = rows.flat().map(email => email?.toLowerCase().trim());
    const isAuthorized = emails.includes(email.toLowerCase().trim());

    return res.status(200).json({ authorized: isAuthorized });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ message: 'Szerver hiba történt' });
  }
}
