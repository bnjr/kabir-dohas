import { getEmbedding } from '../lib/embeddings';
import { searchDohasLocal } from '../lib/vectorSearch';
import { groq } from '../lib/groq';
import fs from 'fs';
import path from 'path';

async function test() {
    const query = "What does Kabir say about pride and ego?";
    console.log(`Testing query: "${query}"`);

    // 1. Test Embedding
    console.log('\n--- Step 1: Generating Embedding ---');
    const embedding = await getEmbedding(query);
    console.log(`✓ Embedding generated. Vector size: ${embedding.length}`);

    // 2. Test Search
    console.log('\n--- Step 2: Searching Local Dohas ---');
    const results = await searchDohasLocal(embedding);
    console.log(`✓ Found ${results.length} relevant dohas.`);
    results.forEach(r => console.log(`  - [ID ${r.id}] ${r.doha_hi.substring(0, 30)}... (Score: ${r.similarity.toFixed(4)})`));

    if (results.length === 0) {
        console.log('❌ No results found. Search failed.');
        return;
    }

    // 3. Test Groq
    console.log('\n--- Step 3: Generating Groq Response ---');
    try {
        const promptPath = path.join(process.cwd(), 'prompt.txt');
        const content = fs.readFileSync(promptPath, 'utf-8');
        const versions = content.split(/Ver \d+/);
        const systemPrompt = versions[3]?.trim() || versions[versions.length - 1]?.trim();

        const contextText = results
            .map(d => `Doha ID ${d.id}:\n${d.doha_hi}\n${d.doha_en}\nMeaning: ${d.meaning_en}`)
            .join('\n\n');

        const userMessage = `"""\n${contextText}\n"""\n\nQuestion: ${query}`;

        const chatCompletion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage },
            ],
        });

        console.log('✓ Groq response received:');
        console.log('------------------------------');
        console.log(chatCompletion.choices[0]?.message?.content);
        console.log('------------------------------');
    } catch (error: any) {
        console.error('❌ Groq test failed:', error.message);
    }
}

test().catch(console.error);
