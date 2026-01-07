/**
 * Centralized application configuration
 * Change values here to update behavior across the app
 */

export const config = {
    /** Mood/theme options for search chips */
    moods: ['Peace', 'Love', 'Ego', 'Truth', 'Discipline', 'Surrender'] as const,

    /** Loading and status messages */
    messages: {
        loading: {
            search: 'Consulting the ancient verses...',
            random: 'Consulting Kabir...',
            general: 'Loading...',
        },
        error: {
            generic: 'An error occurred. Please try again.',
            fetch: 'Failed to fetch data.',
        },
    },

    /** Pagination settings */
    pagination: {
        defaultPageSize: 10,
        dohaListPageSize: 5,
    },

    /** Search placeholder text */
    searchPlaceholder: 'Ask about life, peace, or truth...',

    /** Page titles */
    titles: {
        home: 'In search of wisdom...',
        search: 'Seeking wisdom on...',
        dohaOfDay: 'Doha of the Day',
        wisdomReceived: 'Wisdom Received',
    },

    /** Subtitles */
    subtitles: {
        search: "Ask a question or select a theme to explore Kabir's teachings.",
    },
} as const

/** Type for mood values */
export type Mood = typeof config.moods[number]
