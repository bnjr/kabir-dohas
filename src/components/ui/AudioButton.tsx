import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh, faStop } from '@fortawesome/free-solid-svg-icons'

interface AudioButtonProps {
    text: string
}

const AudioButton: React.FC<AudioButtonProps> = ({ text }) => {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        const handleEnd = () => setIsPlaying(false)
        if ('speechSynthesis' in window) {
            window.speechSynthesis.addEventListener('end', handleEnd)
        }
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.removeEventListener('end', handleEnd)
                window.speechSynthesis.cancel()
            }
        }
    }, [])

    const handleToggleAudio = () => {
        if (!('speechSynthesis' in window)) {
            alert('Sorry, your browser does not support audio features.')
            return
        }

        if (isPlaying) {
            window.speechSynthesis.cancel()
            setIsPlaying(false)
        } else {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = 'hi-IN'
            utterance.onend = () => setIsPlaying(false)
            utterance.onerror = () => setIsPlaying(false)
            setIsPlaying(true)
            window.speechSynthesis.speak(utterance)
        }
    }

    return (
        <button
            onClick={handleToggleAudio}
            title={isPlaying ? "Stop listening" : "Listen in Hindi"}
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 shadow-sm ${isPlaying
                    ? 'bg-serene-accent text-white animate-pulse'
                    : 'bg-serene-muted/20 text-serene-accent hover:bg-serene-accent/20'
                }`}
        >
            <FontAwesomeIcon icon={isPlaying ? faStop : faVolumeHigh} size="sm" />
        </button>
    )
}

export default AudioButton
