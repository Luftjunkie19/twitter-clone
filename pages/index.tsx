import { Inter } from 'next/font/google';

import Form from '@/components/Form';
import Header from '@/components/layoutComponents/Header';
import PostFeed from '@/components/posts/PostFeed';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className='text-blue-400 text-4xl'>
    <Header label='Home'/>
    <Form placeholder="What's happening ?"/>
    <PostFeed/>
    </main>
  );
}
