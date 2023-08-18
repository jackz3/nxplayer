import { useEffect } from "react"
import { usePlayerStore } from "@/app/(store)/store"
import { signIn, useSession } from "next-auth/react"
import useSWR from "swr"

const fetcher = ([path]: [string]) => {
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
      .then((res) => {
        return res.filter((x: any) => x.isdir === 1 || x.real_category === 'mp3')
      })
    }

interface LoadBaiduProps {
  // path: string
  // fileName: string
  // seek: number
} 
function LoadBaidu(props: LoadBaiduProps) {
  const [ setPlayId, setSource, path, fileName, seek ] = usePlayerStore(state => [state.setPlayId, state.setSource, state.path, state.fileName, state.seek])
  const { status } = useSession()
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('Baidu', {})
    }
    if (status === 'authenticated') {

    }
  }, [status])
  const { data, error, isLoading } = useSWR([path], fetcher)

  useEffect(() => {
    if (data) {
      const idx = data.findIndex((x: any) => x.server_filename === fileName)
      if (idx >= 0) {
        setSource('baidu', path, data)
        setPlayId(idx, seek)
      }
    }
  }, [data]) 

  return (
    <div>Playing</div>
  )
}

export default LoadBaidu