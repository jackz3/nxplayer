'use client'
import { useEffect } from "react"
import { redirect } from "next/navigation"

function MsLoginRedirect() {
  useEffect(() => {
    const hash = location.hash
    if (hash) {
      const hashObj = new URLSearchParams(hash)
      const state  = hashObj.get('state')
      const redirectUri = state?.split('=|')[1]
      if (redirectUri) {
        redirect(redirectUri + hash) 
      }
    }
  }, [])
  return (
    <></>
  )
}

export default MsLoginRedirect