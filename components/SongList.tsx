import Btn from "./base/Btn"

const SongList = ({list = [], stop, handle, active, open}) => (
  <div className='flex flex-col w-full h-full pt-0 pr-0 pb-4 rounded-2xl box-border overflow-hidden bg-[#FDFDFD]'> 
    <h3 className='flex items-center relative h-32 text-4xl py-0 pr-6 pl-12 text-[#FDFDFD] bg-[#583D91] m-0 rounded-b-2xl'>
      Songs
      {(active === -1) && 
        <Btn className='list__action absolute z-10 -bottom-10 right-8 w-[5.4rem] h-[5.4rem] rounded-full bg-[#FDFDFD]
         shadow-[0_0.5rem_1rem_rgba(88,61,145,0.3)] duration-150 opacity-0 scale-0 animate-[scale_0.3s_forwards]
         hover:shadow-[0_0.3rem_0.6rem_rgba(88,61,145,0.4)] text-[#583D91] text-3xl' icon='play' onClick={() => stop(0)}/>
      }
    </h3>
    <div className={`list__wrapper px-0 pt-8 pb-24 flex-1 w-[calc(100% + 1.7rem)] overflow-y-auto ${open ? 'opacity-50': ''}`}>
      {list.map((el,index) => (
        <div key={index} className={`list__item flex items-center relative w-full pt-2 pr-12 pb-2 pl-6 transition-[0.3s ease-in] box-border bg-[#FDFDFD]
         before:absolute before:top-0 before:left-0 before:-z-10 before:w-full before:h-full before:opacity-0 before:bg-gradient-to-r from-indigo-800/[.2] to-indigo-800/[.02]
         enabled:hover:z-10 enabled:hover:before:translate-x-0 enabled:hover:before:opacity-100
         before:transition-[0.3s ease-out] before:-translate-x-full ${active === index ? 'z-10 before:opacity-100 before:translate-x-0' : ''} ${open ? 'opacity-50 -translate-x-8' : ''}`} style={{transitionDelay: `${0.075 * index}s`}} onClick={() => stop(index)}>
          <span className={`list__cover flex relative z-10 w-16 h-16 rounded-2xl overflow-hidden m-0 duration-300 drop-shadow-[0_0.3rem_0.3rem_rgba(196,196,196,0.2)] ${open ? '-translate-x-8 opacity-0' : ''}`} style={{transitionDelay: `${0.075 * index}s`}}>
            <img className="absolute w-full h-full" src={el.cover}/>
          </span>
          <div className='flex flex-col justify-around flex-1 relative w-[calc(100%)] h-full cursor-pointer p-4 box-border rounded-2xl transition-[0.15s]' >
            <span className='text-xl font-bold pt-0 pl-0 pb-2 whitespace-nowrap text-ellipsis overflow-hidden'>{el.name}</span>
            <span className='text-neutral-700/[.6] text-lg whitespace-nowrap text-ellipsis overflow-hidden'>{el.author}</span>
          </div>
          <span className={`info__duration text-neutral-700/[.6] text-lg transition-[0.3s] ${open ? 'opacity-0' : ''}`} style={{transitionDelay: `${0.075 * index}s`}}>{el.duration}</span>
        </div>
      ))}
    </div>
  </div>
)

export default SongList
// .list__item:not(:disabled):hover {
//   transition-delay: 0s !important;
// }
// .list__action {
//   width: 5.4rem;
//   height: 5.4rem;
//   border-radius: 50%;
// }
// .list__action i {
//   font-size: 2rem;
// }
// .list__wrapper.bg .list__item {
//   transform: translate3d(0, 2rem, -2rem) scale(0.9);
// }