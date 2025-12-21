import React from 'react'
import ReactMarkdown from 'react-markdown'

interface SynopsisProps {
  synopsis: string
}

const SynopsisCard: React.FC<SynopsisProps> = ({ synopsis }) => {
  return (
    <div className="serene-card p-10 mx-auto mb-12 w-full max-w-3xl border border-serene-accent/5">
      <h2 className="text-sm uppercase tracking-widest font-sans font-bold mb-6 text-serene-accent">
        The Master's Perspective
      </h2>
      <div className="text-serene-text prose prose-serene max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 {...props} className="text-3xl font-serif font-bold mb-6 tracking-tight" />
            ),
            h2: ({ node, ...props }) => (
              <h2 {...props} className="text-2xl font-serif font-semibold mb-4 tracking-tight" />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="text-lg font-sans leading-relaxed mb-6 opacity-90" />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc list-inside mb-6 space-y-2 opacity-90" />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className="list-decimal list-inside mb-6 space-y-2 opacity-90" />
            ),
            code: ({ node, ...props }) => (
              <code
                {...props}
                className="bg-serene-accent/10 text-serene-accent px-2 py-0.5 rounded font-mono text-sm"
              />
            ),
            pre: ({ node, ...props }) => (
              <pre
                {...props}
                className="bg-serene-accent/5 p-6 rounded-2xl overflow-auto mb-6 border border-serene-accent/5"
              />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote
                {...props}
                className="border-l-4 border-serene-accent/20 pl-6 italic mb-6 text-serene-text/80"
              />
            ),
            img: ({ node, ...props }) => (
              <img
                {...props}
                className="rounded-2xl shadow-lg mx-auto mb-8"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            ),
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="text-serene-accent font-medium underline decoration-serene-accent/30 hover:decoration-serene-accent transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            sup: ({ node, ...props }) => (
              <sup {...props} className="text-serene-accent font-bold">
                <a
                  href={`/doha/${props.id}`}
                  className="no-underline hover:text-serene-accent"
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
