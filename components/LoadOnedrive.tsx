
import { useEffect } from "react"
import { usePlayerStore, useMsAccountStore, OneDriveStat, extractFileInfo } from "@/app/(store)/store"
import useSWR from "swr"
import { getList } from "@/lib/msgraph"

const fetcher = ([path, loggedIn]: [string, boolean]) => {
  if (!loggedIn) return null
    return getList(path).then(res => { 
      return res.json() }).then(res => {
      const list: OneDriveStat[]  = []
      res.children.forEach((item: any) => {
        if (item.folder || item.name.includes('.mp3')) {
        const file = extractFileInfo(item)
                list.push(file)
        }
      })
      return list
    }).catch(e => { console.log(e); return null})
}

interface LoadBaiduProps {
  // path: string
  // fileName: string
  // seek: number
} 
function LoadOnedrive(props: LoadBaiduProps) {
  // const { path, fileName, seek } = props
  const [ loggedIn, login] = useMsAccountStore(state => [state.loggedIn, state.login])
  const [ setPlayId, setSource, path, fileName, seek ] = usePlayerStore(state => [state.setPlayId, state.setSource, state.path, state.fileName, state.seek])
  useEffect(() => {
    if (!loggedIn) {
      login()
    }
  }, [loggedIn])
  const { data, error, isLoading } = useSWR([path, loggedIn], fetcher)

  useEffect(() => {
    if (data) {
      const idx = data.findIndex((x: any) => x.name === fileName)
      if (idx >= 0) {
        setSource('onedrive', path, data)
        setPlayId(idx, seek)
      }
    }
  }, [data]) 

  return (
    <div>Playing</div>
  )
}

export default LoadOnedrive