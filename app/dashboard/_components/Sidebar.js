import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Layout, Shield } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const { user } = useUser();
  const path = usePathname();
  return (
    <div className='shadow-md h-screen p-7 w-full'>
      <Link href={'/'}>
        <Image src={"/chat-bot-voice.gif"} height={70} width={70} alt='logo' />
      </Link>
      <div className='mt-10'>
        <Link href={"/dashboard"}>
          <div
            className={`flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 hover:rounded-lg cursor-pointer ${path == '/dashboard' && 'bg-slate-200'}`}>
            <Layout />
            <h2>Dashboard</h2>
          </div>
        </Link>
        <Link href={"/dashboard/upgrade"}>
          <div
            className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 hover:rounded-lg cursor-pointer ${path == '/dashboard/upgrade' && 'bg-slate-200'}`}>
            <Shield />
            <h2>Upgrade</h2>
          </div>
        </Link>
        <Link href={"/chat"}>
          <div
            className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 hover:rounded-lg cursor-pointer ${path == '/chat' && 'bg-slate-200'}`}>
            <Image src={'/chat.png'} width={20} height={20} alt='chat'/>
            <h2>Try Bot!</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
