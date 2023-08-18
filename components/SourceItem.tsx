'use client'
import Link from 'next/link'
import { useLatestRecordStore, SourceType, usePlayerStore } from "@/app/(store)/store"
import { useStore } from "@/lib/hooks"

interface SourceProps {
  source: SourceType
} 
function Home(props: SourceProps) {
  const { source } = props
  const [ setLoadingSource ] = usePlayerStore(state => [state.setLoadingSource])
  const record = useStore(useLatestRecordStore, state => state[source])
  let msg = ''
  let path = ''
  let fileName = ''
  let seek = 0
  if (record) {
    msg = `${record.path}`
    path = record.path
    fileName = record.fileName
    seek = record.seek
  }

  const sourceName = source === 'onedrive' ? 'OneDrive' : 'Baidu'

  const play = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoadingSource(source, true, path, fileName, seek)
  }

  return (
    <Link href={`/${source}/${path}${fileName ? '?play' : ''}`} className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="flex">
      <div className="font-semibold">{sourceName}</div>
      <span className="text-sm text-gray-500 dark:text-gray-400">{msg}</span>
      </div>
      <button onClick={play}>Play</button><span>{fileName}-{seek}</span>
    </Link>
  )
}

export default Home