import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className=' h-screen flex min-h-screen flex-col items-center justify-evenly p-24'>
      <div className='bg-black p-4 rounded'>
        <h1 className='text-7xl font-bold underline'>Parking Challenge</h1>
      </div>
      <div className='flex justify-between w-1/3'>
        <Link href={'/admin'}>
          <button className='bg-slate-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-3xl'>
            I&apos;m admin
          </button>
        </Link>
        <Link href={'/user'}>
          <button className='bg-slate-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-3xl'>
            I&apos;m user
          </button>
        </Link>
      </div>
    </main>
  );
}
