'use client'
import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import PathSelect from "@/components/PathSelect"
import FileList from "@/components/FileList"
import { useSearchParams } from "next/navigation"
import Loading from "@/components/Loading"

interface BaiduFilesProps {
  params: {
    path: string[]
  }
}
function BaiduFiles(props: BaiduFilesProps) {
  const { params: { path } } = props
  const { status } = useSession()
  const searchParams = useSearchParams()
  const action = searchParams.has('play')
  const paths = path ?? []

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('Baidu', {})
    }
  }, [status])

  if (status !== 'authenticated') return <Loading message="Logging in" />

  return (<>
    <PathSelect root='baidu' path={paths} />
    <div className='grow overflow-y-auto'>
      <FileList source='baidu' path={'/' + paths.join('/')} action={action} />
    </div>
  </>
  )
}

export default BaiduFiles