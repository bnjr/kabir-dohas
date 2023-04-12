import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share'
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
  const handleCopyLink = () => {
    copy(url)
    alert('Link copied to clipboard!')
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
      <button
        onClick={handleCopyLink}
        className='focus:outline-none cursor-pointer mr-2'
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
          color: 'gray'
        }}
      >
        <FontAwesomeIcon icon={faCopy} size='lg' color='white'/>
      </button>
    </div>
  )
}

export default ShareButtons
