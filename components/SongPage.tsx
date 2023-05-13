'use client'
import Btn from "./base/Btn";

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

const SongPage = ({index, stop, next, prev, open, handleOpen, pause}) => {
  const data = songList[index];
  return (
  <div className={`song absolute top-full left-0 z-20 flex flex-col h-full w-full bg-[#583D91] rounded-3xl pb-32 box-border duration-500  shadow-[0_0rem_1rem_rgba(43,0,99,0.4)] ${open ? '-translate-y-[78rem]' : 'simple -translate-y-32'}`}>
    <Btn className='cursor-pointer absolute -top-4 right-4 w-12 h-12 rounded-2xl z-20 text-[#583D91] duration-150 shadow-[0_0_1rem_rgba(88,61,145,0.2)] text-3xl' icon='angle-down' onClick={handleOpen}/>
      <div className={`song__cover-wrapper w-full h-1/2 flex-none basis-0 relative duration-300 ${open ? 'flex-1 items-end' : 'rounded-2xl flex duration-75 scale-[0.8]'}`}>
        <div className={`song__cover absolute top-0 left-0 w-full h-full overflow-hidden flex items-end duration-300 shadow-[0_0.5rem_0.5rem_rgba(68,68,68,0.3)] rounded-t-2xl rounded-b-[50%] ${open ? '' : 'scale-[0.8] duration-[0.03s] rounded-[50%]'}`}>
          <img className=" absolute top-1/2 left-1/2 -z-10 min-w-full w-full min-h-full -translate-x-1/2 -translate-y-1/2" src={data.cover} alt="" />
        </div>
        {open && 
          <div className='song__actions flex items-center justify-between w-full py-0 px-4'>
            <Btn className='song__btn opacity-0 animate-[horizontalShift_forwards_0.6s] -translate-x-full text-2xl m-0 text-[#FDFDFD] bg-transparent duration-300' icon='random'/>
            <Btn className='song__btn translate-x-full text-2xl animate-[horizontalShift_forwards_0.6s] m-0 text-[#FDFDFD] bg-transparent duration-300' icon='repeat'/>
          </div>
        }
      </div>
    <div className={`song__info w-full relative p-4 box-border ${open ? 'h-1/2 flex flex-col items-center justify-center' : 'h-[10%] flex-none flex-row py-12 pr-6 pl-4'}`}>
      <span className={`song__name flex flex-1 text-4xl font-bold uppercase ${open ? 'items-center' : 'flex flex-col items-start cursor-pointer'}`} onClick={!open ? handleOpen : undefined}>
        <span className={` bg-gradient-to-r from-[#FDFDFD] to-slate-50/[0.4] animation[fill_15s_forwards_linear] bg-[size:200%]] bg-clip-text ${open ? 'text-center' : 'bg-[#FDFDFD] text-2xl animate-none leading-5 normal-case'}`}>{data.name}</span>
        <span className={`song__author absolute w-full ${open ? 'text-center text-2xl font-medium' : 'bg-[#FDFDFD] animate-none leading-5 normal-case static text-lg text-left font-light top-8 left-0'}`}>{data.author}</span>
      </span>
      <div className={`song__panel flex justify-center ${open ? 'w-full' : 'w-auto'}`}>
        {open && <Btn className={`song__btn prev text-[#FDFDFD] bg-transparent duration-300 enabled:hover:bg-zinc-50/[.3] mr-8 ${open ? 'm-0 w-20 h-20 ' : 'm-0 h-[3.6rem] w-[3.6rem] text-xl hidden'} shadow-[0_0_1rem_rgba(88,61,145,0.2)]`} icon='backward' disabled={!prev} onClick={prev}/>}
        <Btn className='song__btn m-0 text-[#FDFDFD] bg-transparent duration-300 w-20 h-20 text-4xl mr-8' icon={pause ? 'play' : 'pause'} onClick={() => stop(index)}/>
        <Btn className='song__btn next m-0 text-[#FDFDFD] bg-transparent duration-300 w-20 h-20 text-4xl' icon='forward' disabled={!next} onClick={next}/>
      </div>
      {!open && <span className='absolute -bottom-2 left-6 flex w-[calc(100%-3rem)] h-1 rounded-sm bg-zinc-50/[.5]'><span className="h-full bg-zinc-50/[.8]"></span></span>}
    </div>
  </div>
)
};

export default SongPage
// .song.simple .backward i {
//   transform: rotate(-180deg);
// .song__author {
//   text-transform: none;
//   -webkit-text-fill-color: rgba(253, 253, 253, 0.6);
// .song__name span {
//   background: -webkit-linear-gradient(left, #FDFDFD 50%, rgba(253, 253, 253, 0.4) 50%) right;
//   background-size: 200%;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   animation: fill 15s forwards linear;