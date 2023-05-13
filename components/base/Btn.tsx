'use client'
import { FaPlay, FaAngleDown, FaRandom, FaBackward, FaPause, FaForward, FaRedoAlt } from 'react-icons/fa'

const Btn = ({className = '', icon = 'play', children, ...props}) => {
  let ico
  switch (icon) {
    case 'play_arrow':
    case 'play':
      ico = <FaPlay /> 
      break;
    case 'angle-down':
      ico = <FaAngleDown />
      break;
    case 'random':
      ico = <FaRandom />
      break
    case 'backward':
      ico = <FaBackward />
      break;
    case 'pause':
      ico = <FaPause />
      break;
    case 'forward':
      ico = <FaForward />
      break
    case 'repeat':
      ico = <FaRedoAlt />
      break
    default:
      ico = <FaPlay /> //<i className={`fa fa-${icon}`} />
      break;
  }
  return <button className={`btn--play ${className} flex items-center justify-center w-16 h-16 ml-4 border-r-8 border-none cursor-pointer rounded-2xl 
    text-neutral-700/[.2] duration-150 enabled:hover:rounded-full focus:outline-none focus:shadow-[0_0_0.5rem_#c4c4c4]`} {...props}>
    {children 
      ? children
      : ico 
    }
  </button>
}

export default Btn
// .btn--play i {
//   opacity: 0.7;
// }
// .btn--play:not(:disabled):hover i {
//   opacity: 1;
// }