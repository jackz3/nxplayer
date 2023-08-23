'use client'
import { usePlayerStore } from "@/app/(store)/store"
import { IoVolumeMediumOutline, IoFileTraySharp } from "react-icons/io5"

function LocalFiles () {
  const [ setSource, setPlayId, source, state, mediaFiles, playId ] = usePlayerStore(state => [state.setSource, state.setPlayId, state.source, state.state, state.files, state.playId])
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files === null) return 
    let total = files.length
    const list = new Array(total).fill(null)
    for (let i = 0; i < files.length; i++) {
      const filereader = new FileReader();
      filereader.readAsDataURL(files[i]);
      filereader.onload = () => {
        const { name, size, type } = files[i]
        const data = filereader.result
        list[i] = { name, data, size, type }
        if (--total === 0) {
          setSource('local', '', list)
          setPlayId(0)
        }
      }
    }
  }
  const file = mediaFiles[playId]

  return (
    <li className='mb-2 border-b-[1px]'>
      <div onClick={() => document.getElementById('localFile')?.click()} className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-lg flex items-center"><IoFileTraySharp className="w-6 h-6 mr-1" />Local Files</div>
        </div>
        <div className='flex items-center'>
          <span className='text-sm mr-1'>{source === 'local' && file?.name || 'Please, click to select files'}</span>
          {state === 'playing' && source === 'local' ? <IoVolumeMediumOutline className='w-6 h-6' /> : null}
        </div>
        <input id="localFile" multiple type='file' className='hidden' onChange={onSelectFile} />
      </div>
    </li>
  )
}

export default LocalFiles