/**
 * Core Doha data structure returned from API
 */
export interface DohaData {
    id: string
    doha_hi: string
    doha_en: string
    meaning_en: string
}

/**
 * User favorite association
 */
export interface Favorite {
    userId: string
    dohaId: string
}

/**
 * Synopsis/summary from AI query response
 */
export type Synopsis = string

/**
 * Response from doha query API (streaming text)
 */
export interface DohaQueryResponse {
    synopsis: Synopsis
    relatedDohas?: DohaData[]
}
