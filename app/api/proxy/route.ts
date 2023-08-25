import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { Readable } from 'node:stream';

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

export async function GET(request: NextRequest, res: NextResponse) {
  const token = await getToken({ req: request })
  // const session = getServerSession(request, resp, )
  if (token) {
    const { accessToken } = token
    const { searchParams } = new URL(request.url)
    const url = decodeURIComponent(searchParams.get('url') ?? '')
    console.log('url', url)
    // const iterator = makeIterator()
    // const stream = iteratorToStream(iterator)
    // return new Response(stream)
    const redirectUrl = await getFinalRedirectUrl(`${url}&access_token=${accessToken}`)
    if (redirectUrl) {
      const url = `/proxy/baidu_dl/${redirectUrl.slice(7)}`
      console.log(redirectUrl)
      console.log(url)
      return new Response('', { status: 302, headers: { Location: url } })
    }
    // fetch(`${url}&access_token=${accessToken}`).then(r => {
    //   if (r.body === null) return
    //   // Argument of type 'ReadableStream<Uint8Array>' is not assignable to parameter of type 'ReadableStream<any>'.
    //   // Type 'ReadableStream<Uint8Array>' is missing the following properties from type 'ReadableStream<any>': values, [Symbol.asyncIterator]
    //   // @ts-ignore
    //   // return new NextResponse(r.body)
    //   Readable.from(r.body).pipe(res)
    // })
    // const res = await fetch(`${url}&access_token=${accessToken}`)
    // const data = await res.arrayBuffer()
    // return new Response(data, {
    //   status: 200,
    //   headers: { 'Accept-Ranges': 'bytes', 'Content-Length': `${ data.byteLength }`, 'Content-range': `bytes 0-${ data.byteLength - 1 }/${ data.byteLength}`, 'Content-Type': 'audio/mpeg' } })
  } else {
    return new Response('No token', { status: 401 })
  }
}

function getFinalRedirectUrl(url: string) {
  return fetch(url, { method: 'HEAD', redirect: 'manual' })
    .then((response) => {
      if (response.status === 302) {
        const redirectUrl = response.headers.get('location');
        return redirectUrl;
      } else {
        throw new Error('The URL did not return a 302 redirect.');
      }
    });
}
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()
 
      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}
 
function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
 
const encoder = new TextEncoder()
 
async function* makeIterator() {
  yield encoder.encode('<p>One</p>')
  await sleep(200)
  yield encoder.encode('<p>Two</p>')
  await sleep(200)
  yield encoder.encode('<p>Three</p>')
}