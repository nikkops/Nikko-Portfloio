import { Outlet, useLocation } from 'react-router-dom'
import Background from './Background'
import ScreenTransition from './ScreenTransition'

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <Background />
      <ScreenTransition pathname={pathname}>
        <Outlet />
      </ScreenTransition>
    </>
  )
}
