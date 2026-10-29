import { Outlet } from 'react-router-dom'
import Background from './Background'

export default function Layout() {
  return (
    <>
      <Background />
      <main className="screen">
        <Outlet />
      </main>
    </>
  )
}
