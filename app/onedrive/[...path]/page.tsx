'use client'
import { useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { useMsAccountStore } from "@/app/(store)/store"
import PathSelect from "@/components/PathSelect"
import FileList from "@/components/FileList"

function OnedriveFiles({ params }: { params: { path: string[] } }) {
  const { path } = params
  const searchParams = useSearchParams()
  const action = searchParams.has('play')
  const [ loggedIn, login ] = useMsAccountStore(state => [state.loggedIn, state.login])
  const paths = path ?? []

  useEffect(() => {
    if (!loggedIn) {
      login()
    }
  }, [loggedIn])

  if (!loggedIn) return null
  return (
    <>
        <PathSelect root='onedrive' path={paths} />
        <FileList source='onedrive' path={'/' + paths.join('/')} action={action} />
    </>
  )
}

export default OnedriveFiles