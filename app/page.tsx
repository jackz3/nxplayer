// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import SideBar from '@/components/Siderbar'
// import Center from '@/components/Center'
import App from '@/components/App'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex w-[32rem] h-[64rem] text-2xl overflow-hidden relative min-w-full'>
      <App />
    </div>
    // <div className='bg-black h-screen overflow-hidden'>
    //   <main className='flex'>
    //     <SideBar />
    //     <Center />
    //   </main>
    //   <div className='sticky bottom-0'>
    //     {/* <Player />         */}
    //   </div>
    //   </div>
  )
}
