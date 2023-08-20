'use client'
import { OneDriveStat, SourceType, BaiduFile } from "@/app/(store)/store"
import Link from "next/link"
import { IoFolderOutline, IoMusicalNotesOutline } from "react-icons/io5"

interface FileItemProps {
  source: SourceType
  file: BaiduFile|OneDriveStat,
  idx: number,
  playing: boolean,
  playFile: (idx: number) => void
}
function FileItem(props: FileItemProps) {
  const { idx, playFile, source, playing } = props
  let renderItem
  if (source === 'baidu') {
    const file = props.file as BaiduFile
    renderItem = file.isdir ? <Link className="inline-flex items-center w-full" href={`/baidu${file.path}`}><IoFolderOutline className="w-4 h-4" />{file.server_filename}</Link> : <div className="inline-flex items-center w-full" onClick={() => playFile(idx)}><IoMusicalNotesOutline className="w-4 h-4" />{file.server_filename}</div>
  } else {
    const file = props.file as OneDriveStat
    const { href } = location
    renderItem =  file.isFile ? <div className="inline-flex items-center" onClick={() => playFile(idx)} ><IoMusicalNotesOutline className="w-4 h-4" />{file.name}</div> : <Link className="inline-flex items-center" href={`${href}/${file.name}`} ><IoFolderOutline className="w-4 h-4" />{file.name}</Link>
  }
  return <div className={`mx-4 px-2 pb-12 border-b border-gray-200 h-10 leading-[3rem] cursor-pointer ${playing ? 'bg-gray-100' : ''}`}>{
    renderItem
  }</div>
}

export default FileItem