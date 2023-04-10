// components/Footer.tsx
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8">
      <nav className="bg-white shadow-xl rounded-lg p-4 max-w-2xl w-full">
        <ul className="flex justify-between">
          <li>
            <Link href="/">
              <button className="text-indigo-700 hover:text-indigo-800 focus:outline-none mr-4">
                Home
              </button>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <button className="text-indigo-700 hover:text-indigo-800 focus:outline-none">
                About
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
