// components/ShareButtons.tsx
import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share'
import {FacebookIcon, TwitterIcon, LinkedinIcon} from 'react-share'

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
      <LinkedinShareButton url={url} title={title} summary={description}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  )
}

export default ShareButtons
