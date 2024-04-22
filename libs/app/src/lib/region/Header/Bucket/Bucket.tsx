import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export const Bucket = () => {
  // --------------------- ===
  //  HANDLERS
  // ---------------------
  const router = useRouter()
  const handleClick = () => {
    deleteCookie('username')
    router.push('/login')
  }

  // --------------------- ===
  //  RENDER
  // ---------------------
  return (
    <div className="bg-slate-50 flex flex-col py-4 px-8 rounded">
      <button onClick={handleClick}>Log out</button>
    </div>
  )
}
