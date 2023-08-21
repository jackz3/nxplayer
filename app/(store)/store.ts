import { create } from 'zustand'
import { signIn } from "next-auth/react"
import { persist, createJSONStorage } from 'zustand/middleware'
import { init, msLogin, account, getList, profile, myPhoto } from '@/lib/msgraph'

export type SourceType = 'baidu'|'onedrive'
export type State = 'stopped' | 'playing' | 'paused'

interface PlayerState {
  source?: SourceType
  playId: number
  path: string
  files: any[]
  seek: number
  fileName: string
  loading: boolean
  state: State
  setLoadingSource: (source: SourceType, loading: boolean, path: string, fileName: string, seek: number) => void
  setLoading: (loading: boolean) => void
  setSource: (src: SourceType, path: string, files: any[]) => void
  setPlayId: (id: number, seek?: number) => void
  setPlayerState: (state: State) => void
  setPlayIdByName: (source: SourceType, path: string, files: any[], fileName: string, seek: number) => void
}
export const usePlayerStore = create<PlayerState>()((set, get) => ({
  // source: '',
  playId: -1,
  fileName: '',
  path: '',
  files: [],
  seek: 0,
  loading: false,
  state: 'stopped',
  setLoadingSource: (source: SourceType, loading: boolean, path: string, fileName: string, seek: number) => set({ source, loading, path, fileName, seek, playId: -1 }),
  setLoading: (loading: boolean) => set({ loading }),
  setSource: (source: SourceType, path: string, files: any[]) => {
    if (source === 'baidu') {
      set({ source, path, files: files.filter(x => x.isdir === 0), playId: -1 })
    }
    if (source === 'onedrive') {
      set({ source, path, files: files.filter(x => x.isFile === true), playId: -1 })
    }
    // set({source, path, files, playId: -1 } )
  },
  setPlayId: (id: number, seek: number = 0) => set({ playId: id, seek }),
  setPlayerState: (state: State) => set({ state }),
  setPlayIdByName: (source: SourceType, path: string, files: any[], fileName: string, seek: number) => {
    get().setSource(source, path, files)
    let idx = -1
    if (source === 'baidu') {
      idx = get().files.findIndex((x: any) => x.server_filename === fileName)
      // if (idx >= 0) {
      //   get().setPlayId(idx, seek)
      // }
    }
    if (source === 'onedrive') {
      idx = get().files.findIndex((x: any) => x.name === fileName)
    }
    if (idx >= 0) {
      get().setPlayId(idx, seek)
    }
  }
}))

export type BaiduFile = {
  fs_id: string
  server_filename: string
  isdir: number 
  path: string
}

export interface OneDriveStat {
  size: number;
  lastModifiedDateTime: string;
  downloadUrl: string;
  isFile: boolean;
  name: string;
}
const _oneDrive_cache: {[path: string]: OneDriveStat[]} = {}

export function extractFileInfo (f: any) {
  const { size, lastModifiedDateTime, '@microsoft.graph.downloadUrl': downloadUrl, name, folder } = f
  const stat: OneDriveStat = { isFile: !folder, size, lastModifiedDateTime, downloadUrl, name }
  return stat
}

interface MsAccount {
  loggedIn: boolean
  username: string
  name: string
  avatar?: Blob
  files: OneDriveStat[]
  // init: () => Promise<void>
  login: () => Promise<void>
  logout: () => void
  // getFiles: (path: string) => Promise<any>
}
export const useMsAccountStore = create<MsAccount>()((set) => ({
  loggedIn: false,
  username: '',
  name: '',
  avatar: undefined,
  files: [],
  init: async () => {
    await init()
    set({ username: account.username, name: account.name, loggedIn: account.accessToken !== '' })
  },
  login: async () => {
    await msLogin()
    if (account && account.accessToken) { 
      set({ username: account.username, name: account.name, loggedIn: true })
      const avatar = await myPhoto().then(res => res.blob())
      set({ avatar })
    }
  },
  logout: () => {
    set({ loggedIn: false })
  }
  // getFiles: async (path: string) => {
  //   return await getList(path).then(res => {
  //     const list: OneDriveStat[]  = []
  //     res.children.forEach((item: any) => {
  //       if (item.folder || item.name.includes('.mp3')) {
  //       const file = extractFileInfo(item)
  //               list.push(file)
  //       }
  //     })
  //     _oneDrive_cache[`${path}`] = list
  //     set({ files: list })
  //     return list
  //   }) 
  // }
}))

interface BaiduAccount {
  loggedIn: boolean
  username: string
  name: string
  files: OneDriveStat[]
  login: () => Promise<void>
  // getFiles: (path: string) => Promise<any>
}
export const useBaiduAccountStore = create<BaiduAccount>()((set) => ({
  loggedIn: false,
  username: '',
  name: '',
  files: [],
  login: async () => {
    signIn()
  },
  getFiles: async (path: string) => {
  }
}))


type PlayRecord = {
  path: string,
  fileName: string,
  seek: number
}
interface LatestRecord {
  source: SourceType,
  baidu?: PlayRecord,
  onedrive?: PlayRecord,
  updateRecord: (source: SourceType, path: string, fileName: string) => void,
  updateSeek: (source: SourceType, seek: number) => void
}

export const useLatestRecordStore = create<LatestRecord>()(
  persist(
    (set, get) => ({
      source: 'baidu',
      baidu: undefined,
      onedrive: undefined,
      updateRecord: (source: SourceType, path: string, fileName: string) => {
        set({ [source]: { path, fileName, seek: 0 }, source })
      },
      updateSeek: (source: SourceType, seek: number) => {
        set({ [source]: { ...get()[source], seek }, source })
      }
    }),
    {
      name: 'latest-record', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
    }
  )
)