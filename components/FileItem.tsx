'use client'
import { OneDriveStat, SourceType, BaiduFile } from "@/app/(store)/store"
import Link from "next/link"

interface FileItemProps {
  source: SourceType
  file: BaiduFile|OneDriveStat,
  idx: number,
  playFile: (idx: number) => void
}
function FileItem(props: FileItemProps) {
  const { idx, playFile, source } = props
  let renderItem
  if (source === 'baidu') {
    const file = props.file as BaiduFile
    renderItem = file.isdir ? <Link href={`/baidu${file.path}`}>{'[文件夹]' + file.server_filename}</Link> : <div onClick={() => playFile(idx)}>{'[文件]' + file.server_filename}</div>
  } else {
    const file = props.file as OneDriveStat
    const { href } = location
    renderItem =  file.isFile ? <div onClick={() => playFile(idx)} >{file.name}</div> : <Link href={`${href}/${file.name}`} >{file.name}</Link>
  }
  return <div>{
    renderItem
  }</div>
}

export default FileItem