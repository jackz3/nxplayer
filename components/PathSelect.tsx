import Link from 'next/link'
import { IoHome, IoChevronForwardSharp } from 'react-icons/io5'

interface PathSelectProps {
  path: string[]
  root: string
}
function PathSelect(props: PathSelectProps) {
  const { path, root } = props
  return (
    <nav className="flex sticky top-16 pl-4 my-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href={root} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <IoHome className='w-5 h-5 mr-1' />
            {root} 
          </Link>
        </li>
      {
        path.slice(0, -1).map((item, idx) => (
        <li key={idx}>
          <div className="flex items-center">
            <IoChevronForwardSharp className="w-4 h-4 text-gray-400 mr-1" aria-hidden="true" />
            <Link href={`/${root}/${path.slice(0, idx + 1).join('/')}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{decodeURIComponent(item)}</Link>
          </div>
        </li>))
      }
      {
        path.length === 0 ? null : <li aria-current="page">
          <div className="flex items-center">
            <IoChevronForwardSharp className="w-4 h-4 text-gray-400 mr-1" aria-hidden="true" />
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{decodeURIComponent(path.slice(-1)[0])}</span>
          </div>
        </li>
      }
      </ol>
    </nav>
  )
}

export default PathSelect