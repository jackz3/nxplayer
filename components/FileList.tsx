import useSWR from "swr"
import FileItem from "./FileItem"
import { usePlayerStore, SourceType, OneDriveStat, extractFileInfo, useLatestRecordStore, BaiduFile, useMsAccountStore } from "@/app/(store)/store"
import { getList } from "@/lib/msgraph"

const fetcher = ([source, path]: [SourceType, string]) => {
  if (source === 'onedrive') {
    return getList(path).then(res => {
      if (res.status === 401) {
        console.log(res)
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
  return fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: '/rest/2.0/xpan/file?method=list&dir=' + path // encodeURIComponent(path)
          // url: '/rest/2.0/xpan/multimedia?method=listall&path=%2F&recursion=1',
        }),
      })
      .then((res) => res.json())
      .then((res) => {
        return res.filter((x: any) => x.isdir === 1 || x.real_category === 'mp3')
      })
    }

interface FileListProps {
  source: SourceType,
  path: string,
  action: boolean
}
function FileList (props: FileListProps) {
  const { path, source } = props
  const { data, error, isLoading } = useSWR([source, path], fetcher)
  const [ setPlayId, setSource, playerPath ] = usePlayerStore(state => [state.setPlayId, state.setSource, state.path])
  const [ logout ] = useMsAccountStore(state => [state.logout])

  const playFile = (idx: number) => {
    if (playerPath !== path) {
      setSource(source, path, data)
    }
    setPlayId(idx)
  }

  if (isLoading) return <div>loading...</div>
  if (error === 'Unauthorized' && source === 'onedrive') {
    console.log(error)
    logout()
    return null
  }
  if (error) {
    console.log(error)
  }
  if (error) return <div>error...</div>
  if (!data) return null
  return <div className="grow">
  {
    data.map((file: BaiduFile|OneDriveStat, idx: number) => <FileItem key={idx} source={source} file={file} idx={idx} playFile={playFile} />)
  }
  </div>
}

export default FileList