import Image from 'next/image'
import SourceItem from '@/components/SourceItem'
import LocalFiles from '@/components/LocalFiles'
import MsLoginRedirect from '@/components/MsLoginRedirect'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <div id="mega-menu-full-dropdown" className="mt-1 bg-white border-gray-200 shadow-sm border-t dark:bg-gray-800 dark:border-gray-600 grow">
            <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white grid-cols-1 md:px-6">
                <ul aria-labelledby="mega-menu-full-dropdown-button">
                    <SourceItem source="baidu" icon={<Image className='mr-1' src="/baidu_pan.svg" alt="logo" width={24} height={24} />} />
                    <SourceItem source="onedrive" icon={<Image className='mr-1' src="/onedrive.jpg" alt="logo" width={26} height={26} />} />
                    <LocalFiles />
                </ul>
            </div>
            <MsLoginRedirect />
        </div>
    )
}
