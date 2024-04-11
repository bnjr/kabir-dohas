import fs from 'fs'
import csv from 'csv-parser'

// Define an interface to describe the structure of each row in your CSV file
interface CsvRow {
  id: string
  doha_hi: string
  doha_en: string
  meaning_en: string
}

const readCSVFile = (filePath: string): Promise<CsvRow[]> => {
  return new Promise((resolve, reject) => {
    const results: CsvRow[] = []

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: CsvRow) => results.push(data))
      .on('end', () => {
        resolve(results)
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

export { readCSVFile, CsvRow }
