'use client'
import { useState, useEffect, ChangeEvent, useCallback, useRef } from 'react'
import { IoPlaySkipBack, IoPlaySkipForward, IoChevronUpCircleOutline, IoChevronDownCircleOutline, IoPause, IoRepeat, IoShuffle, IoReload, IoPlay } from 'react-icons/io5'
import { Howl } from 'howler';
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

const getFileInfo = async (fsId: string) => {
  return requestBaidu(`/rest/2.0/xpan/multimedia?method=filemetas&dlink=1&fsids=[${fsId}]`)
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

type LoopMethod = 'loop'|'single'|'shuffle'
export default function Player() {
  const [source, playId, setPlayId, files, path, initialSeek, loading, setLoading, fileName] = usePlayerStore(state => [state.source, state.playId, state.setPlayId, state.files, state.path, state.seek, state.loading, state.setLoading, state.fileName])
  const [ updateRecord, updateSeek, store ] = useLatestRecordStore(state => [state.updateRecord, state.updateSeek, state ])
  const [duration, setDuration] = useState(0)
  const [seek, setSeek] = useState(0)
  const [percent, setPercent] = useState(0)
  const [handlerPercent, setHandlerPercent] = useState(0)
  const [state, setState] = useState<'stopped' | 'playing' | 'paused'>('stopped')
  const [seeking, setSeeking] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [collapsed, setCollapsed] = useState(true)
  const [timer, setTimer] = useState(0)
  const [loopMethod, setLoopMethod] = useState<LoopMethod>('loop')
  const loopMethodRef = useRef<LoopMethod>(loopMethod)
  const timerRef = useRef<number>(0)
  const timerStartRef = useRef<number>(0)

  const onPlay = useCallback( (sound: Howl) => {
    const d = sound.duration()
    const sk = sound.seek() ?? 0
    const p = sk * 100 / d
    setDuration(d)
    setSeek(sk)
    setPercent(p)
    updateSeek(source!, sk)
    if (timer > 0) {
      if (timerStartRef.current === 0) {
        timerStartRef.current = Date.now() 
        // setTimerStart(Date.now())
      }
      if (timerStartRef.current > 0 && (Date.now() - timerStartRef.current > timer * 60 * 1000)) {
        sound.pause()
        setTimerValue(0)
        // setTimerStart(0)
        timerStartRef.current = 0
        setState('paused')
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
        getFileInfo(fsId).then((data: any) => {
          const dlink = data[0].dlink
          console.log('dlink', dlink)
          const url = `/api/proxy?url=${encodeURIComponent(dlink)}`
          loadPlay(myPlayer, 'baidu', url, name)
        })
      } else if (source === 'onedrive') {
        const file = files[playId] as OneDriveStat
        const url = file.downloadUrl
        const name = file.name
        loadPlay(myPlayer, 'onedrive', url, name)
        // myPlayer.createSound(url, 'onedrive', initialSeek);
        // playSound(myPlayer)
        // updateRecord(source, path, name)
      }
    }
  }, [source, playId])

  const playNext = useCallback((myPlayer: MyPlayer) => {
    const loopMethod = loopMethodRef.current
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
  }, [files])

  const onEnd = useCallback((myPlayer: MyPlayer) => {
    // if (loopMethod === 'loop') {
    //   if (playId === files.length - 1) {
    //     setPlayId(0);
    //   } else {
    //     setPlayId(playId + 1);
    //   }
    // } else if (loopMethod === 'single') {
    //   // myPlayer.seek(0);
    //   // myPlayer.play()
    // }
    playNext(myPlayer)
      if (timerRef.current < 0 && (++timerStartRef.current + timerRef.current) == 0) {
        myPlayer.pause()
        timerStartRef.current = 0
        setTimerValue(0)
        setState('paused')
      }
  }, [files])

  const playSound = useCallback((myPlayer: MyPlayer) =>{
    myPlayer.onPlay(onPlay);
    myPlayer.onEnd(() => {
      onEnd(myPlayer)
    });
    // if (initialSeek > 0) {
    //   myPlayer.seekSeconds(initialSeek);
    // }
    myPlayer.play();
    setState('playing');
  }, [loopMethod, files])

  const playHandler = () => {
    const player = MyPlayer.getInstance()
    if (player) {
      if (state === 'playing') {
        player.pause()
        setState('paused')
      } else {
        player.play()
        setState('playing')
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
    <div className="sticky w-full max-w-screen-md bottom-0 left-0 bg-white">
      {
        collapsed ? null : <div className='flex'>
          {speed}
          <RangeSlider className='' onChange={changeSpeed} sizing="sm" min={0.5} max={2} step={0.1} value={speed} />
          timer
          <select onChange={(e) => setTimerValue(+e.target.value)} className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {
              Timers.map((t) => <option selected={t.value === timer} key={t.value} value={t.value}>{t.label}</option>)
            }
          </select>
        </div>
      }
      <div className='flex'>
        {(loading && source === 'baidu' && fileName && path) ? <LoadBaidu /> : null}
        {(loading && source === 'onedrive' && fileName && path) ? <LoadOnedrive /> : null}
        <button onClick={() => setCollapsed(!collapsed)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {
            collapsed ? <IoChevronUpCircleOutline className='w-3 h-3' /> : <IoChevronDownCircleOutline className='w-3 h-3' />
          }
          <span className="sr-only">Icon description</span>
        </button>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300" style={{ "width": `${percent}%` }}></div>
      </div>
      <RangeSlider className='opacity-50' onMouseDown={onMouseDown} onMouseUp={onMouseUp} onChange={onSeek} sizing="sm" min={0} max={100} step={0.1} value={seeking ? handlerPercent : percent} />
      <div className="flex">
        <div>{formatTime(seek)}</div>
        <div>{ state === 'playing' && source && store[source] ? store[source]?.fileName : null }</div>
        <button type="button" onClick={() => { if (playId > 0) { setPlayId(playId - 1) } }} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
          <IoPlaySkipBack className='w-4 h-4' />
          <span className="sr-only">Prev</span>
        </button>
        <button type="button" onClick={playHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {
            state === 'playing' ? <IoPause className="w-4 h-4" /> : <IoPlay className="w-4 h-4" />
          }
          <span className="sr-only">Play</span>
        </button>
        <button type="button" onClick={() => playNext(MyPlayer.getInstance())} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
          <IoPlaySkipForward className='w-4 h-4' />
          <span className="sr-only">Prev</span>
        </button>

        <div>{formatTime(duration)}</div>
        {
          timer > 0 ? <div>{formatTime(timer * 60 - (timerStartRef.current === 0 ? 0 : (Date.now() - timerStartRef.current) / 1000) )}</div> : null
        }
        <button type="button" onClick={switchLoopMethod}>
        {
          loopMethod === 'loop' ? <IoRepeat className='w-4 h-4' /> : loopMethod === 'shuffle' ? <IoShuffle className='w-4 h-4' /> : <IoReload className='w-4 h-4' />
        }
        </button>
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