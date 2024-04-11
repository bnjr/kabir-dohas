import { readCSVFile } from './read-CSV'
import { generateEmbeddings } from './generateEmbeddings'
import * as dotenv from 'dotenv'
dotenv.config()

async function main() {
  try {
    const fileName = process.argv[2]

    if (!fileName) {
      console.error(
        'Please provide a CSV file name as a command-line argument.',
      )
      process.exit(1)
    }

    const dohas = await readCSVFile(fileName)
    await generateEmbeddings(dohas)
  } catch (error) {
    console.error('Error processing dohas:', error)
  }
}

main()
