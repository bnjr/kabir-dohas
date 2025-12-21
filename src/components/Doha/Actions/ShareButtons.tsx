import React, { useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share'
import copy from 'copy-to-clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

interface ShareButtonsProps {
  url: string
  title: string
  description: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  description,
}) => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false)

  const handleCopyLink = () => {
    copy(url)
    setShowCopiedMessage(true)
    setTimeout(() => {
      setShowCopiedMessage(false)
    }, 2000)
  }

  return (
    <div className='flex'>
      <FacebookShareButton
        url={url}
        className='mr-2'
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title} className='mr-2'>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title} className='mr-2'>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <div className='relative mr-2'>
        <button
          onClick={handleCopyLink}
          className='focus:outline-none cursor-pointer bg-serene-muted text-white rounded-full p-2 w-9 h-9 flex items-center justify-center hover:bg-serene-accent transition-colors duration-300 shadow-sm'
        >
          <FontAwesomeIcon icon={faCopy} size='sm' />
        </button>
        {showCopiedMessage && (
          <span className='absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-serene-accent text-white text-[10px] uppercase tracking-widest font-semibold rounded-lg shadow-lg whitespace-nowrap animate-in fade-in zoom-in duration-300'>
            Wisdom Shared
          </span>
        )}
      </div>
    </div>
  )
}

export default ShareButtons
