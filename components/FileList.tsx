import useSWR from "swr"
import FileItem from "./FileItem"
import { usePlayerStore, SourceType, OneDriveStat, extractFileInfo, BaiduFile, useMsAccountStore } from "@/app/(store)/store"
import { getList } from "@/lib/msgraph"
import Loading from "./Loading"
import { baiduFetcher } from "./LoadBaidu"
import { useSession } from "next-auth/react"

const fetcher = ([source, path, token]: [SourceType, string, string]) => {
  if (source === 'onedrive') {
    return getList(path).then(res => {
      if (res.status === 401) {
        throw new Error('Unauthorized')
      }
      return res.json() }).then(res => {
      const list: OneDriveStat[]  = []
      res.children.forEach((item: any) => {
        if (item.folder || item.name.includes('.mp3')) {
        const file = extractFileInfo(item)
                list.push(file)
        }
      })
      return list
    })//.catch(e => { console.log(e)})
  }
  return baiduFetcher([path, token])
}

interface FileListProps {
  source: SourceType,
  path: string,
}
function FileList (props: FileListProps) {
  const { path, source } = props
  const { data: session } = useSession()
  const { data, error, isLoading } = useSWR([source, path, session?.user.accessToken], fetcher)
  const [ setPlayId, setSource, playerSource, playerPath, playId ] = usePlayerStore(state => [state.setPlayId, state.setSource, state.source, state.path, state.playId])
  const [ logout ] = useMsAccountStore(state => [state.logout])

  const playFile = (idx: number) => {
    if (playerPath !== path || playerSource !== source) {
      setSource(source, path, data)
    }
    setPlayId(idx)
  }

  if (isLoading) return <Loading message="Loading ..." />
  if (error === 'Unauthorized' && source === 'onedrive') {
    console.log(error)
    logout()
    return null
  }
  if (error) {
    console.log(error)
  }
  if (error) return <div>error...</div>

  if (!data) return <Loading message="Loading ..." />
  let offset = 0
  if (source === 'baidu') {
    offset = data.filter((x: BaiduFile) => x.isdir === 1).length
  } else if (source === 'onedrive') {
    offset = data.filter((x: OneDriveStat) => !x.isFile).length
  }
  
  return <div className="">
  {
    data.map((file: BaiduFile|OneDriveStat, idx: number) => <FileItem key={idx} source={source} file={file} idx={idx - offset} playFile={playFile} playId={playId} />)
  }
  </div>
}

export default FileList