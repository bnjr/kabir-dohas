import React from 'react'
import Chip from '@/components/ui/Chip'
import { config } from '@/lib/config'

interface MoodChipsProps {
    onChipClick?: (mood: string) => void
}

const MoodChips: React.FC<MoodChipsProps> = ({ onChipClick }) => {
    return (
        <div
            className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {config.moods.map((mood) => (
                <Chip
                    key={mood}
                    onClick={() => onChipClick?.(mood)}
                >
                    {mood}
                </Chip>
            ))}
        </div>
    )
}

export default MoodChips
