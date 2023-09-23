'use client'
import { usePathname } from 'next/navigation'
import { CSSTransition, TransitionGroup } from "react-transition-group";


export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <TransitionGroup className={'flex flex-col grow'}>
      <CSSTransition key={path} timeout={{ exit: 0, enter: 500 }} unmountOnExit classNames={{
        // appear: "opacity-0",
        // appearActive: "transition ease-in-out duration-500 opacity-100",
        enter: "transform translate-x-36",
        enterActive: "transform translate-x-0 transition-transform duration-300 ease-in-out",
        // enterDone: 'opacity-100',
        exit: 'opacity-0',
      }}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  )
}