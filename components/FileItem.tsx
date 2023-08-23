'use client'
import { OneDriveStat, SourceType, BaiduFile } from "@/app/(store)/store"
import Link from "next/link"
import { IoFolderOutline, IoMusicalNotesOutline } from "react-icons/io5"

function formatFileSize(fileSize: number): string {
  const kiloByte = 1024;
  const megaByte = kiloByte * 1024;
  const gigaByte = megaByte * 1024;

  if (fileSize >= gigaByte) {
    return `${(fileSize / gigaByte).toFixed(2)}G`;
  } else if (fileSize >= megaByte) {
    return `${(fileSize / megaByte).toFixed(2)}M`;
  } else if (fileSize >= kiloByte) {
    return `${(fileSize / kiloByte).toFixed(2)}K`;
  } else {
    return `${fileSize}B`;
  }
}

interface DirItemProps {
  source: SourceType
  file: BaiduFile | OneDriveStat
}
function DirItem(props: DirItemProps) {
  const { file, source } = props
  let url = ''
  let name = ''
  if (source === 'baidu') {
    const f = file as BaiduFile
    url = `/baidu${f.path}`
    name = f.server_filename
  } else {
    const f = file as OneDriveStat
    const { href } = location
    url = `${href}/${f.name}`
    name = f.name
  }
  return <Link className="inline-flex items-center w-full" href={url}><IoFolderOutline className="w-4 h-4 mr-1" />{name}</Link>
}


interface PlayableItemProps {
  source: SourceType
  file: BaiduFile | OneDriveStat,
  idx: number,
  playFile: (idx: number) => void
}
function PlayableItem(props: PlayableItemProps) {
  const { idx, playFile, source, file } = props
  let name = ''
  if (source === 'baidu') {
    const f = file as BaiduFile
    name = f.server_filename
  } else {
    const f = file as OneDriveStat
    name = f.name
  }

  return (
    <div className="flex items-center w-full justify-between" onClick={() => playFile(idx)}>
      <span className="inline-flex items-center"><IoMusicalNotesOutline className="w-4 h-4 mr-1" />{name}</span>
      <span className="text-sm ml-1">{formatFileSize(file.size)}</span></div>
  )
}

interface FileItemProps {
  source: SourceType
  file: BaiduFile | OneDriveStat,
  idx: number,
  playId: number,
  playFile: (idx: number) => void
}
function FileItem(props: FileItemProps) {
  const { idx, playFile, source, playId } = props
  let renderItem
  if (source === 'baidu') {
    const file = props.file as BaiduFile
    renderItem = file.isdir ? <DirItem source="baidu" file={file} /> : <PlayableItem source="baidu" file={file} idx={idx} playFile={playFile} />
  } else {
    const file = props.file as OneDriveStat
    renderItem = file.isFile ? <PlayableItem source="onedrive" file={file} idx={idx} playFile={playFile} /> : <DirItem source="onedrive" file={file} />
  }
  return <div className={`mx-4 px-2 pb-12 border-b border-gray-200 h-10 leading-[3rem] cursor-pointer ${playId === idx ? 'bg-gray-100' : ''}`}>{
    renderItem
  }</div>
}

export default FileItem