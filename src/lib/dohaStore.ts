import fs from 'fs';
import path from 'path';

export interface DohaData {
    id: string | number;
    doha_hi: string;
    doha_en: string;
    meaning_en: string;
    embedding?: number[];
}

const JSON_PATH = path.join(process.cwd(), 'src', 'data', 'dohas_with_embeddings.json');

let cachedDohas: DohaData[] | null = null;

export function getDohas(): DohaData[] {
    if (cachedDohas) return cachedDohas;

    if (fs.existsSync(JSON_PATH)) {
        const content = fs.readFileSync(JSON_PATH, 'utf-8');
        cachedDohas = JSON.parse(content);
        return cachedDohas || [];
    }

    return [];
}

export function getDohaById(id: string | number): DohaData | null {
    const dohas = getDohas();
    return dohas.find(d => String(d.id) === String(id)) || null;
}

export function getRandomDoha(): DohaData | null {
    const dohas = getDohas();
    if (dohas.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * dohas.length);
    return dohas[randomIndex];
}

export function getDohaOfDay(): DohaData | null {
    const dohas = getDohas();
    if (dohas.length === 0) return null;

    // Create a seed based on the date YYYY-MM-DD
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    // Simple hash for the seed
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    const index = Math.abs(hash) % dohas.length;
    return dohas[index];
}

export function getPaginatedDohas(page: number, limit: number) {
    const dohas = getDohas();
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return dohas.slice(startIndex, endIndex);
}
