import React, {useState} from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import {FacebookIcon, TwitterIcon, WhatsappIcon} from 'react-share'
import copy from 'copy-to-clipboard'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCopy} from '@fortawesome/free-solid-svg-icons'

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
        quote={`${title} - ${description}`}
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
          className='focus:outline-none cursor-pointer'
          style={{
            backgroundColor: 'darkgrey',
            borderRadius: '50%',
            border: '1px solid #ccc',
            padding: '5px',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '32px',
            height: '32px',
            color: 'gray',
          }}
        >
          <FontAwesomeIcon icon={faCopy} size='lg' color='white' />
        </button>
        {showCopiedMessage && (
          <span className='text-sm text-white absolute top-full mt-1 px-2 py-1 bg-gray-400 border border-gray-950 rounded'>
            Link Copied
          </span>
        )}
      </div>
    </div>
  )
}

export default ShareButtons
