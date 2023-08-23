'use client'
import Link from 'next/link'
import Image from 'next/image'
import { IoVolumeMediumOutline, IoPlay } from 'react-icons/io5'
import { useLatestRecordStore, SourceType, usePlayerStore } from "@/app/(store)/store"
import { formatTime } from '@/lib/Player'
import { useStore } from "@/lib/hooks"

interface SourceProps {
  source: SourceType
  icon: JSX.Element
}
function Home(props: SourceProps) {
  const { source, icon } = props
  const [setLoadingSource, state, playerSource] = usePlayerStore(state => [state.setLoadingSource, state.state, state.source])
  const record = useStore(useLatestRecordStore, state => state[source])
  let path = ''
  let fileName = ''
  let seek = 0
  let msg = 'Please connect your account'
  if (record) {
    path = record.path
    fileName = record.fileName
    seek = record.seek
  }

  const sourceName = source === 'onedrive' ? 'OneDrive' : 'Baidu Pan'

  const play = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoadingSource(source, true, path, fileName, seek)
  }
  return (
    <li className='mb-2 border-b-[1px]'>
      <Link href={`/${source}/${path}`} className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-lg flex items-center">{icon}{sourceName}</div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{decodeURIComponent(path)}</span>
        </div>
        <div className='flex items-center'>
          <span className='text-sm mr-1'>{fileName ?? msg}</span>
          {state === 'playing' && source === playerSource ? <IoVolumeMediumOutline className='w-6 h-6' /> : fileName ? <button onClick={play} className='inline-flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2 py-1 text-xs font-medium text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'>
            <IoPlay className='w-4 h-4 mx-2' />{seek ? <span className='text-sm mr-1'>{formatTime(seek)}</span> : null}</button> : null}
        </div>
      </Link>
    </li>
  )
}

export default Home