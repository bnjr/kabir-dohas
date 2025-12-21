const AboutSection: React.FC = () => {
  return (
    <div className='serene-card p-10 max-w-2xl w-full border border-serene-accent/5'>
      <h2 className='text-3xl font-serif font-bold mb-6 text-serene-text tracking-tight'>The Essence</h2>
      <div className="space-y-6 text-lg font-sans text-serene-text/90 leading-relaxed">
        <p>
          This sanctuary is dedicated to the timeless wisdom of Kabir, the 15th-century
          Indian mystic and saint. His verses, known as <span className="italic font-serif font-medium text-serene-accent">Dohas</span>, are couplets that carry profound spiritual truths with simplicity.
        </p>
        <p>
          Our mission is to offer these teachings as a source of peace and clarity in the modern world, making the ancient path accessible to all seekers.
        </p>
        <p>
          This experience was co-created with the assistance of advanced AI, bridging ancient wisdom with contemporary technology to foster a deeper understanding of our shared existence.
        </p>
        <p>
          This project is an open offering to the community. You may explore the source, suggest refinements, or join the collaborative effort on{' '}
          <a
            href='https://github.com/bnjr/kabir-dohas'
            target='_blank'
            rel='noopener noreferrer'
            className='text-serene-accent font-medium underline decoration-serene-accent/30 hover:decoration-serene-accent transition-all duration-300'
          >
            GitHub
          </a>
          .
        </p>
        <p>
          Should you wish to connect, share reflections, or seek guidance on the platform, reach out via Twitter at{' '}
          <a
            href='https://twitter.com/a5rz00n'
            target='_blank'
            rel='noopener noreferrer'
            className='text-serene-accent font-medium underline decoration-serene-accent/30 hover:decoration-serene-accent transition-all duration-300'
          >
            @a5rz00n
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default AboutSection
