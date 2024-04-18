import React from 'react'
import ReactMarkdown from 'react-markdown'

interface SynopsisProps {
  synopsis: string
}

const SynopsisCard: React.FC<SynopsisProps> = ({ synopsis }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mx-auto mb-4 w-full">
      <h2 className="text-xl text-indigo-700 font-bold mb-2">
        {"Kabir's Thoughts"}
      </h2>
      <div className="text-gray-800 prose">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 {...props} className="text-3xl font-bold mb-4" />
            ),
            h2: ({ node, ...props }) => (
              <h2 {...props} className="text-2xl font-bold mb-3" />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="text-base leading-relaxed mb-4" />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc list-inside mb-4" />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className="list-decimal list-inside mb-4" />
            ),
            code: ({ node, ...props }) => (
              <code
                {...props}
                className="bg-gray-100 text-red-500 px-2 py-1 rounded"
              />
            ),
            pre: ({ node, ...props }) => (
              <pre
                {...props}
                className="bg-gray-100 p-4 rounded overflow-auto"
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                {...props}
                className="border-l-4 border-gray-300 pl-4 italic mb-4"
              />
            ),
            img: ({ node, ...props }) => (
              <img
                {...props}
                className="border rounded shadow mx-auto mb-4"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ),
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            sup: ({ node, ...props }) => (
              <sup {...props} className="text-blue-600">
                <a
                  href={`/doha/${props.id}`}
                  className="no-underline hover:text-blue-800"
                  title={props.title}
                >
                  {props.children}
                </a>
              </sup>
            ),
          }}
        >
          {synopsis}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default SynopsisCard
