"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Dashboard() {
  return (
    <div className='flex gap-12 justify-center items-center min-h-screen'>
      {/* Try Chat Bot Section */}
      <div className='flex flex-col items-center gap-2 transform transition-all hover:scale-105 border-2 p-8 rounded-xl hover:bg-gray-200'>
        <Link href={'/chat'}>
          <div className='flex flex-col items-center gap-10'>
            <Image
              src={'/try_bot.png'}
              alt='try-bot'
              width={55}
              height={55}
              className='object-cover'
            />
            <span className='ml-2'>Try Chat Bot</span>
          </div>
        </Link>
      </div>

      {/* Try Voice Bot Section */}
      <div className='flex flex-col items-center gap-2 transform transition-all hover:scale-105 border-2 p-8 rounded-xl hover:bg-gray-200'>
        <Link href={'/voice-bot'}>
          <div className='flex flex-col items-center gap-10'>
            <Image
              src={'/ai-voice-generator.gif'}
              alt='try-bot'
              width={60}
              height={60}
              className='object-cover'
            />
            <span className='ml-2'>Try Voice Bot</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
