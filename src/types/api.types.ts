/**
 * Generic paginated API response
 */
export interface PaginatedResponse<T> {
    data: T[]
    page: number
    limit: number
    total?: number
    hasMore?: boolean
}

/**
 * Standard API error response
 */
export interface ApiError {
    message: string
    code?: string
    status?: number
}

/**
 * Fetch options for doha list
 */
export interface FetchDohasOptions {
    page?: number
    itemsPerPage?: number
}
