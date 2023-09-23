'use client'
import { usePathname } from 'next/navigation'
import { CSSTransition, TransitionGroup } from "react-transition-group";


export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return (
    <TransitionGroup className={'flex flex-col grow'}>
      <CSSTransition key={path} timeout={600} unmountOnExit classNames={{
        // appear: "opacity-0",
        // appearActive: "transition-opacity ease-in-out duration-500 opacity-100",
        enter: "translate-x-16 opacity-0",
        enterActive: "translate-x-px transition duration-500 ease-in opacity-100",
        // enterDone: 'opacity-100',
        exit: 'opacity-0',
      }}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  )
}