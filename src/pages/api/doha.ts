// pages/api/doha.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

// Get your Airtable API key and base ID from environment variables
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

// Connect to your Airtable
const base = new Airtable({ apiKey }).base(baseId as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const records = await base('Dohas')
      .select({
        maxRecords: 1,
        view: 'Grid view',
      })
      .firstPage();

    const record = records[0];
    const dohaData = {
      Doha: record.get('Doha'),
      EN: record.get('EN'),
      Meaning: record.get('Meaning'),
    };

    res.status(200).json(dohaData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching doha data' });
  }
}
