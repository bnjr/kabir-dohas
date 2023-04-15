const AboutSection: React.FC = () => {
  return (
    <div className='bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full'>
      <h2 className='text-2xl font-semibold mb-4 text-indigo-700'>About</h2>
      <p className='text-gray-800'>
        This website is dedicated to sharing the wisdom of Kabir, a 15th-century
        Indian mystic poet and saint. His poetry, known as Dohas, consists of
        couplets that convey deep philosophical and spiritual messages. Our goal
        is to help spread Kabir&apos;s teachings to a wider audience, making his
        wisdom accessible to all.
      </p>
      <p className='text-gray-800 mt-4'>
        The development of this website was made possible with the help of
        ChatGPT, an AI language model by OpenAI. Utilizing the power of AI, we
        were able to design, develop, and create a user-friendly platform that
        showcases Kabir&apos;s Dohas. This collaboration highlights the potential of
        AI in assisting with various aspects of web development, enabling us to
        create a unique and engaging user experience.
      </p>
      <p className='text-gray-800 mt-4'>
        The website&apos;s source code is open source, and we welcome contributions
        from the community. You can view the repository, submit issues, and
        contribute to the project on{' '}
        <a
          href='https://github.com/bnjr/kabir-dohas'
          target='_blank'
          rel='noopener noreferrer'
          className='text-indigo-700 underline'
        >
          GitHub
        </a>
        . By making the code available to all, we aim to foster collaboration
        and encourage improvements that can benefit the entire community.
      </p>
      <p className='text-gray-800 mt-4'>
        If you have any questions, suggestions, or feedback, feel free to reach
        out to us on Twitter at{' '}
        <a
          href='https://twitter.com/a5rz00n'
          target='_blank'
          rel='noopener noreferrer'
          className='text-indigo-700 underline'
        >
          @a5rz00n
        </a>
        . We would be happy to hear from you and assist in any way we can.
      </p>
    </div>
  )
}

export default AboutSection
