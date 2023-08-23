import { useEffect } from "react"
import { usePlayerStore } from "@/app/(store)/store"
import { signIn, useSession } from "next-auth/react"
import useSWR from "swr"

export const baiduFetcher = ([path]: [string]) => {
  return fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: '/rest/2.0/xpan/file?method=list&dir=' + path // encodeURIComponent(path)
        }),
      })
      .then((res) => res.json())
      .then((res) => res.filter((x: any) => x.isdir === 1 || x.real_category === 'mp3' || x.server_filename.includes('.mp3')))
    }

interface LoadBaiduProps {
} 
function LoadBaidu(props: LoadBaiduProps) {
  const [ setPlayId, setSource, path, fileName, seek, setPlayIdByName ] = usePlayerStore(state => [state.setPlayId, state.setSource, state.path, state.fileName, state.seek, state.setPlayIdByName])
  const { status } = useSession()
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('Baidu', {})
    }
    if (status === 'authenticated') {

    }
  }, [status])
  const { data, error, isLoading } = useSWR([path], baiduFetcher)

  useEffect(() => {
    if (data) {
      setPlayIdByName('baidu', path, data, fileName, seek)
    }
  }, [data]) 

  return (
    <div>Loading</div>
  )
}

export default LoadBaidu