import { type NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';

const Base = 'https://pan.baidu.com'

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request })
  // const session = getServerSession(request, resp, )
  if (token) {
    const { accessToken } = token
    const { url, raw } = await request.json()
    const res = await fetch(`${Base}${url}&access_token=${accessToken}`).then(res => res.json())
    return new Response(JSON.stringify(res.list), { status: 200 })
  } else {
    return new Response('No token', { status: 401 })
  }
}

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })
  // const session = getServerSession(request, resp, )
  if (token) {
    const { accessToken } = token
    const { searchParams } = new URL(request.url)
    const url = decodeURIComponent(searchParams.get('url') ?? '')
    console.log('url', url)
    const res = await fetch(`${url}&access_token=${accessToken}`)
    const data = await res.arrayBuffer()
    return new Response(data, {
      status: 200,
      headers: { 'Accept-Ranges': 'bytes', 'Content-Length': `${ data.byteLength }`, 'Content-range': `bytes 0-${ data.byteLength - 1 }/${ data.byteLength}`, 'Content-Type': 'audio/mpeg' } })
  } else {
    return new Response('No token', { status: 401 })
  }
}