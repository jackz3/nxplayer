'use client'
import { useState, useEffect, ChangeEvent, useCallback, useRef } from 'react'
import { IoPlaySkipBack, IoPlaySkipForward, IoChevronUpCircleOutline, IoChevronDownCircleOutline, IoPause, IoRepeat, IoShuffle, IoReload, IoPlay } from 'react-icons/io5'
import { Howl } from 'howler';
import { useSession } from 'next-auth/react';
import { MyPlayer, formatTime } from '@/lib/Player';
import { usePlayerStore, useLatestRecordStore, OneDriveStat, BaiduFile, SourceType } from '@/app/(store)/store';
import { RangeSlider } from 'flowbite-react'
import LoadBaidu from './LoadBaidu';
import LoadOnedrive from './LoadOnedrive';

export function requestBaidu(url: string, headers: any = {}, params: any = {}) {
  return fetch('/api/proxy', {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify({
      url,
      ...params
    }),
  }).then((res) => res.json())
}

const getFileInfo = async (fsId: string, token?: string) => {
  return fetch(`/proxy/baidu_pan/rest/2.0/xpan/multimedia?method=filemetas&dlink=1&fsids=[${fsId}]&access_token=${token}`)
    .then(res => res.json())
    .then(res => res.list)
  // return requestBaidu(`/rest/2.0/xpan/multimedia?method=filemetas&dlink=1&fsids=[${fsId}]`)
}


const Timers = [
  { value: 0, label: '不定时' },
  { value: 1, label: '1m' },
  { value: 10, label: '10m' },
  { value: 20, label: '20m' },
  { value: 30, label: '30m' },
  { value: 45, label: '45m' },
  { value: -1, label: '1 song' },
  { value: -2, label: '2 songs' },
  { value: -3, label: '3 songs' },
]

// let timerStart = 0

type LoopMethod = 'loop' | 'single' | 'shuffle'
export default function Player() {
  const { data: session } = useSession()
  const [source, playId, setPlayId, files, path, initialSeek, loading, setLoading, fileName, state, setPlayerState] = usePlayerStore(state => [state.source, state.playId, state.setPlayId, state.files, state.path, state.seek, state.loading, state.setLoading, state.fileName, state.state, state.setPlayerState])
  const [updateRecord, updateSeek, store] = useLatestRecordStore(state => [state.updateRecord, state.updateSeek, state])
  const [duration, setDuration] = useState(0)
  const [seek, setSeek] = useState(0)
  const [percent, setPercent] = useState(0)
  const [handlerPercent, setHandlerPercent] = useState(0)
  // const [state, setState] = useState<'stopped' | 'playing' | 'paused'>('stopped')
  const [seeking, setSeeking] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [collapsed, setCollapsed] = useState(true)
  const [timer, setTimer] = useState(0)
  const [loopMethod, setLoopMethod] = useState<LoopMethod>('loop')
  const loopMethodRef = useRef<LoopMethod>(loopMethod)
  const timerRef = useRef<number>(0)
  const timerStartRef = useRef<number>(0)

  const onPlay = useCallback((sound: Howl) => {
    const d = sound.duration()
    const sk = sound.seek() ?? 0
    const p = sk * 100 / d
    setDuration(d)
    setSeek(sk)
    setPercent(p)
    updateSeek(source!, sk)
    if (timerRef.current > 0) {
      if (timerStartRef.current === 0) {
        timerStartRef.current = Date.now()
      }
      if (timerStartRef.current > 0 && (Date.now() - timerStartRef.current > timerRef.current * 60 * 1000)) {
        sound.pause()
        setTimerValue(0)
        timerStartRef.current = 0
        setPlayerState('paused')
      }
    }
    if (sound.playing()) {
      requestAnimationFrame(() => {
        onPlay(sound)
      });
    }
  }, [source])
  useEffect(() => {
    if (playId >= 0) {
      const myPlayer = MyPlayer.getInstance();
      if (source === 'baidu') {
        const file = files[playId] as BaiduFile
        const name = file.server_filename
        const fsId = file.fs_id
        getFileInfo(fsId, session?.user.accessToken).then((data: any) => {
          const dlink = data[0].dlink
          console.log('dlink', dlink)
          // getFinalRedirectUrl(`${dlink}?access_token=${session?.user.accessToken}`).then((finalUrl) => {
          //   if (finalUrl) {
          //     const url = `/proxy/baidu_dl${finalUrl.slice(8)}`
          //     console.log(finalUrl, url)
          //     loadPlay(myPlayer, 'baidu', url, name)

          //     // const urlObj = new URL(finalUrl)
          //     // ${urlObj.pathname}${urlObj.search}&access_token=${session?.user.accessToken}`
          //   }
          // })
          const url = `/api/proxy?url=${encodeURIComponent(dlink)}`
          loadPlay(myPlayer, 'baidu', url, name)
        })
      } else if (source === 'onedrive') {
        const file = files[playId] as OneDriveStat
        const url = file.downloadUrl
        const name = file.name
        loadPlay(myPlayer, 'onedrive', url, name)
      } else if (source === 'local') {
        const file = files[playId]
        loadPlay(myPlayer, 'local', file.data, file.name)
      }
    }
  }, [source, playId])

  const playNext = useCallback((myPlayer: MyPlayer) => {
    const loopMethod = loopMethodRef.current
    console.log('end', loopMethod, files.length, playId)
    if (loopMethod === 'loop') {
      if (playId === files.length - 1) {
        setPlayId(0);
      } else {
        setPlayId(playId + 1);
      }
    } else if (loopMethod === 'single') {
      myPlayer.seek(0);
      myPlayer.play()
    }
  }, [files, playId])

  const onEnd = useCallback((myPlayer: MyPlayer) => {
    console.log('onEnd', playId)
    playNext(myPlayer)
    if (timerRef.current < 0 && (++timerStartRef.current + timerRef.current) == 0) {
      myPlayer.pause()
      timerStartRef.current = 0
      setTimerValue(0)
      setPlayerState('paused')
    }
  }, [files, playId])

  const playSound = useCallback((myPlayer: MyPlayer) => {
    console.log('playSound', playId)
    myPlayer.onPlay(onPlay);
    myPlayer.onEnd(() => {
      onEnd(myPlayer)
    });
    // if (initialSeek > 0) {
    //   myPlayer.seekSeconds(initialSeek);
    // }
    myPlayer.rate(speed)
    myPlayer.play();
    setPlayerState('playing');
  }, [loopMethod, files, speed])

  const playHandler = () => {
    const player = MyPlayer.getInstance()
    if (player) {
      if (state === 'playing') {
        player.pause()
        setPlayerState('paused')
      } else {
        player.play()
        setPlayerState('playing')
      }
    }
  }

  const onSeek = (e: any) => {
    const percent = e.target.value
    setHandlerPercent(+percent)
  }

  const onMouseDown = () => {
    setHandlerPercent(percent)
    setSeeking(true)
  }
  const onMouseUp = () => {
    const player = MyPlayer.getInstance()
    if (player) {
      player.seek(handlerPercent)
    }
    setSeeking(false)
    setPercent(handlerPercent)
  }

  const changeSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    const speed = +e.target.value
    setSpeed(speed)
    const player = MyPlayer.getInstance()
    if (player) {
      player.rate(speed)
    }
  }

  const setTimerValue = (v: number) => {
    setTimer(v)
    timerRef.current = v
  }

  const setLoopMethodValue = (v: LoopMethod) => {
    setLoopMethod(v)
    loopMethodRef.current = v
  }
  const switchLoopMethod = () => {
    if (loopMethodRef.current === 'loop') {
      setLoopMethodValue('single')
    } else if (loopMethod === 'single') {
      setLoopMethodValue('shuffle')
    } else {
      setLoopMethodValue('loop')
    }
  }

  return (
    <div className="sticky w-full max-w-screen-md bottom-0 left-0 bg-white flex-shrink-0 border-t rounded-t-lg">
      <div className='flex justify-between'>
        {(loading && source === 'baidu' && fileName && path) ? <LoadBaidu /> : null}
        {(loading && source === 'onedrive' && fileName && path) ? <LoadOnedrive /> : null}
        <div className='text-sm mx-auto'>{state === 'playing' && source && store[source] ? store[source]?.fileName : null}</div>
        <div onClick={() => setCollapsed(!collapsed)} className="mr-6 -mt-4 bg-white text-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
          {
            collapsed ? <IoChevronUpCircleOutline className='w-8 h-8' /> : <IoChevronDownCircleOutline className='w-8 h-8' />
          }
          <span className="sr-only">Toggle</span>
        </div>
      </div>
      {
        collapsed ? null : <div className='flex px-2 justify-between my-4'>
          <div className='flex items-center w-1/3'>
            <span className='text-sm mr-1'>speed:{speed}</span>
            <RangeSlider className='-mt-2' onChange={changeSpeed} sizing="sm" min={0.5} max={2} step={0.25} value={speed} /></div>
          <button type="button" onClick={switchLoopMethod}>
            {
              loopMethod === 'loop' ? <IoRepeat className='w-6 h-6' /> : loopMethod === 'shuffle' ? <IoShuffle className='w-6 h-6' /> : <IoReload className='w-6 h-6' />
            }
          </button>
          <div className='flex items-center w-2/5'>
            <span className='text-sm mr-1'>timer</span>
            <select value={timer} onChange={(e) => setTimerValue(+e.target.value)} className="w-full block p-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {
                Timers.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)
              }
            </select>
          </div>
        </div>
      }
      <div className="w-full bg-gray-200 rounded-full h-2 my-4 dark:bg-gray-700">
        <div className="bg-gray-600 h-2 rounded-full dark:bg-gray-300" style={{ "width": `${percent}%` }}></div>
      </div>
      <RangeSlider className='opacity-90 w-full absolute bottom-[4.5rem]' onMouseDown={onMouseDown} onMouseUp={onMouseUp} onChange={onSeek} sizing="sm" min={0} max={100} step={0.1} value={seeking ? handlerPercent : percent} />
      <div className="flex justify-between px-2 pb-4">
        <div>{formatTime(seek)}</div>
        <div className='flex items-center'>
          <button type="button" onClick={() => { if (playId > 0) { setPlayId(playId - 1) } }} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
            <IoPlaySkipBack className='w-3 h-3' />
            <span className="sr-only">Prev</span>
          </button>
          <button type="button" onClick={playHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mx-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {
              state === 'playing' ? <IoPause className="w-6 h-6" /> : <IoPlay className="w-6 h-6" />
            }
            <span className="sr-only">Play</span>
          </button>
          <button type="button" onClick={() => playNext(MyPlayer.getInstance())} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
            <IoPlaySkipForward className='w-3 h-3' />
            <span className="sr-only">Next</span>
          </button>
          {
            timer > 0 ? <div className='ml-6 text-sm text-orange-600 absolute right-[20%]'>{formatTime(timer * 60 - (timerStartRef.current === 0 ? 0 : (Date.now() - timerStartRef.current) / 1000))}</div> : null
          }
        </div>
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  )


  function loadPlay(myPlayer: MyPlayer, source: SourceType, url: string, name: string) {
    myPlayer.createSound(url, source, initialSeek);
    if (initialSeek) {
      const [d, p] = myPlayer.getDP(initialSeek);
      setDuration(d);
      setSeek(initialSeek);
      setPercent(p);
      if (loading) {
        playSound(myPlayer);
      }
    } else {
      playSound(myPlayer);
    }
    setLoading(false);
    updateRecord(source, path, name);
  }

}