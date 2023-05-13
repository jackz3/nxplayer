'use client'
import React, { useState } from 'react'
import SongList from './SongList';
import SongPage from './SongPage';

const songList  = [
  // {name:'Sanctified with Dynamite', author: 'PowerWolf', duration: '3:51', cover: 'https://cdnb.artstation.com/p/assets/images/images/010/532/065/large/zsofia-dankova-1.jpg?1539776234'},
  {name:'Army of the Night', author: 'PowerWolf', duration: '3:51', cover: 'https://i.pinimg.com/originals/10/37/36/1037361b721513a7168e1dae07139f55.jpg'},
  // {name:'Higher Than Heaven', author: 'PowerWolf', duration: '3:51', cover: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b81633f7-ac45-4e1d-9255-46297d588240/dcf39re-204aaff0-a53f-4f9b-83d3-81239bf35778.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4MTYzM2Y3LWFjNDUtNGUxZC05MjU1LTQ2Mjk3ZDU4ODI0MFwvZGNmMzlyZS0yMDRhYWZmMC1hNTNmLTRmOWItODNkMy04MTIzOWJmMzU3NzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fE1cp7I7GjauqJ8gKCoqz2cK1BHjeAwhivRnE7oMsVo'},
  {name:'Incense & Iron', author: 'PowerWolf', duration: '3:51', cover: 'https://i.pinimg.com/originals/2b/ca/63/2bca632180d842a6f15908154ce862bb.jpg'},
  {name:'Venom of Venus', author: 'PowerWolf', duration: '3:51', cover: 'https://steamuserimages-a.akamaihd.net/ugc/941709259346307842/830C554F58DDEF61ACD21D28FBC3FC4FEAAAE136/'},
  // {name:'Sanctified with Dynamite', author: 'PowerWolf', duration: '3:51', cover: 'https://cdnb.artstation.com/p/assets/images/images/010/532/065/large/zsofia-dankova-1.jpg?1539776234'},
  {name:'Army of the Night', author: 'PowerWolf', duration: '3:51', cover: 'https://i.pinimg.com/originals/10/37/36/1037361b721513a7168e1dae07139f55.jpg'},
  // {name:'Higher Than Heaven', author: 'PowerWolf', duration: '3:51', cover: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b81633f7-ac45-4e1d-9255-46297d588240/dcf39re-204aaff0-a53f-4f9b-83d3-81239bf35778.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I4MTYzM2Y3LWFjNDUtNGUxZC05MjU1LTQ2Mjk3ZDU4ODI0MFwvZGNmMzlyZS0yMDRhYWZmMC1hNTNmLTRmOWItODNkMy04MTIzOWJmMzU3NzgucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.fE1cp7I7GjauqJ8gKCoqz2cK1BHjeAwhivRnE7oMsVo'},
  {name:'Incense & Iron', author: 'PowerWolf', duration: '3:51', cover: 'https://i.pinimg.com/originals/2b/ca/63/2bca632180d842a6f15908154ce862bb.jpg'},
  {name:'Venom of Venus', author: 'PowerWolf', duration: '3:51', cover: 'https://steamuserimages-a.akamaihd.net/ugc/941709259346307842/830C554F58DDEF61ACD21D28FBC3FC4FEAAAE136/'},
]

function App() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<number>(0)
  const [pause, setPause] = useState(false)

  const handleOpen = () => { setOpen(state => !open) }
  const handlePause = () => { setPause(state => !pause) }
  const handlePlay = (active) => setActive(state => active === state ? -1 : active)
  const next = () => handlePlay(active < songList.length - 1 ? active + 1 : 0);
  const prev = () => handlePlay(active > 0 ? active - 1 : songList.length - 1);
  console.log('open', open)
  return <>
      <SongList 
        list={songList} 
        stop={handlePlay} 
        open={open} 
        handle={handlePlay} 
        active={active}
      />
      {(active > 0 || active === 0) && 
        <SongPage
          open={open}
          index={active} 
          handleOpen={handleOpen} 
          pause={pause}
          stop={handlePause}
          next={next} 
          prev={prev}/>
      }
  </>
}

export default App