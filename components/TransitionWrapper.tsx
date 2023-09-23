'use client'
import { usePathname } from 'next/navigation'
import { CSSTransition, TransitionGroup } from "react-transition-group";


export default function ({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <TransitionGroup className={'flex flex-col grow'}>
      <CSSTransition key={path} timeout={{ exit: 0, enter: 500 }} unmountOnExit classNames={{
        // appear: "opacity-0",
        // appearActive: "transition ease-in-out duration-500 opacity-100",
        enter: "transform-gpu translate-x-24 opacity-0",
        enterActive: "translate-x-0 opacity-100 transition duration-300 ease-in-out",
        // enterDone: 'opacity-100',
        exit: 'opacity-0',
      }}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  )
}