'use client'
import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import PathSelect from "@/components/PathSelect"
import FileList from "@/components/FileList"
import Loading from "@/components/Loading"

interface BaiduFilesProps {
  params: {
    path: string[]
  }
}
function BaiduFiles(props: BaiduFilesProps) {
  const { params: { path } } = props
  const { status } = useSession()
  const paths = path ?? []

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('Baidu', {})
    }
  }, [status])

  if (status !== 'authenticated') return <Loading message="Logging in" />

  return <div className="flex flex-col grow">
    <PathSelect root='baidu' path={paths} />
    <div className='grow overflow-y-auto'>
      <FileList source='baidu' path={'/' + paths.join('/')} />
    </div>
  </div>
}

export default BaiduFiles