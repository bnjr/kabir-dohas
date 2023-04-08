import { useState, useEffect } from 'react';

interface DohaData {
  Doha: string;
  EN: string;
  Meaning: string;
}

const Home = () => {
  const [dohaData, setDohaData] = useState<DohaData | null>(null);

  useEffect(() => {
    const fetchDoha = async () => {
      const response = await fetch('/api/doha');
      const data: DohaData = await response.json();
      setDohaData(data);
    };

    fetchDoha();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {dohaData && (
        <>
          <div className="text-xl font-bold mb-4">{dohaData.Doha}</div>
          <div className="text-lg mb-2">{dohaData.EN}</div>
          <div className="text-base">{dohaData.Meaning}</div>
        </>
      )}
    </div>
  );
};

export default Home;
