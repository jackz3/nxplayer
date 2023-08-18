'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

interface PathSelectProps {
  path: string[]
  root: string
}
function PathSelect(props: PathSelectProps) {
  const { path, root } = props
  console.log(path) 
  return (
    <div className="sticky top-16">
    <Link href={root} className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
      Root
    </Link>
    {
      path.slice(0, -1).map((item, idx) => <Link key={idx} href={`/${root}/${path.slice(0, idx + 1).join('/')}`} className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">{ '/' + decodeURIComponent(item)}</Link>)
    }
    {
      path.length === 0 ? null : <span>{ '/' + decodeURIComponent(path.slice(-1)[0])}</span>
    }
    </div>
  )
}

export default PathSelect