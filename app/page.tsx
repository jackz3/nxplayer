import SourceItem from '@/components/SourceItem'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <div id="mega-menu-full-dropdown" className="mt-1 bg-white border-gray-200 shadow-sm border-y dark:bg-gray-800 dark:border-gray-600 grow">
            <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white grid-cols-1 md:px-6">
                <ul aria-labelledby="mega-menu-full-dropdown-button">
                    <li>
                        <SourceItem source="baidu" />
                    </li>
                    <li>
                        <SourceItem source="onedrive" />
                    </li>
                    <li>
                        <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                            <div className="font-semibold">Google Drive</div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Connect</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
