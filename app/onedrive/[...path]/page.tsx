'use client'
import { useEffect } from "react"
import { useMsAccountStore } from "@/app/(store)/store"
import PathSelect from "@/components/PathSelect"
import FileList from "@/components/FileList"
import Loading from "@/components/Loading"

function OnedriveFiles({ params }: { params: { path: string[] } }) {
  const { path } = params
  const [ loggedIn, login ] = useMsAccountStore(state => [state.loggedIn, state.login])
  const paths = path ?? []

  useEffect(() => {
    if (!loggedIn) {
      login(location.pathname)
    }
  }, [loggedIn])

  if (!loggedIn) return <Loading message="Logging in" />
  return (
    <div className="flex flex-col grow">
      <PathSelect root='onedrive' path={paths} />
      <div className='overflow-y-auto grow'>
        <FileList source='onedrive' path={'/' + paths.join('/')} />
      </div>
    </div>
  )
}

export default OnedriveFiles