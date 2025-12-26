import fs from 'fs';
import path from 'path';
import { getPassageEmbeddings } from '../lib/embeddings';

// Configuration
const CSV_PATH = path.join(process.cwd(), 'src', 'data', 'source', 'kabir-dohas.csv');
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'dohas_with_embeddings.json');

/**
 * Simple CSV parser that handles quoted values with newlines
 */
function parseDohasCSV(content: string) {
    const rows: any[] = [];
    let currentRow: string[] = [];
    let currentVal = '';
    let inQuotes = false;

    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        const nextChar = content[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Handle escaped quotes ""
                currentVal += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentVal.trim());
            currentVal = '';
        } else if (char === '\n' && !inQuotes) {
            currentRow.push(currentVal.trim());
            if (currentRow.length > 1) {
                rows.push({
                    id: currentRow[0],
                    doha_hi: currentRow[1],
                    doha_en: currentRow[2],
                    meaning_en: currentRow[3]
                });
            }
            currentRow = [];
            currentVal = '';
        } else {
            currentVal += char;
        }
    }

    if (currentRow.length > 0 || currentVal) {
        currentRow.push(currentVal.trim());
        rows.push({
            id: currentRow[0],
            doha_hi: currentRow[1],
            doha_en: currentRow[2],
            meaning_en: currentRow[3]
        });
    }

    return rows.slice(1).filter(r => r.id && r.doha_hi);
}

async function main() {
    console.log('Reading CSV...');
    const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
    const dohas = parseDohasCSV(csvContent);
    console.log(`Found ${dohas.length} dohas.`);

    const embeddedDohas: any[] = [];

    // Process in batches
    const BATCH_SIZE = 50;
    for (let i = 0; i < dohas.length; i += BATCH_SIZE) {
        const batch = dohas.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}...`);

        const inputs = batch.map(d => `${d.doha_hi}\n${d.doha_en}`);
        const embeddings = await getPassageEmbeddings(inputs);

        embeddings.forEach((emb, index) => {
            embeddedDohas.push({
                ...batch[index],
                embedding: emb,
            });
        });
    }

    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(embeddedDohas, null, 2));
    console.log(`Successfully created ${OUTPUT_PATH}`);
}

main().catch(console.error);
