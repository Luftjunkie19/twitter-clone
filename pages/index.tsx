import { Inter } from 'next/font/google';

import Header from '@/components/layoutComponents/Header';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className='text-blue-400 text-4xl'>
    <Header label='Home'/>
    Hello  World!
    </main>
  );
}
