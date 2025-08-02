import { useState, useEffect } from 'react';
import PWABadge from './PWABadge.tsx'
import logo from '../public/icon.svg';

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4'>
        <img src={logo} alt='Logo' className='w-32 h-32' />
        <div className='w-full max-w-md h-4 bg-gray-300 rounded-full overflow-hidden mt-4'>
          <div
            className='h-full bg-[#FF5050] transition-all duration-100'
            style={{ width: `${progress}%` }}
          ></div>
        
        </div>
      </div>
      <PWABadge />
    </>
  );
}

export default App;
