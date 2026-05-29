import { Link, useLocation } from 'react-router-dom'

function Navbar({ darkMode, setDarkMode }) {

  const location = useLocation()

  return (

    <nav
      className={`sticky top-0 z-50 border-b ${
        darkMode
          ? 'bg-zinc-950 border-zinc-800'
          : 'bg-white border-zinc-300'
      }`}
    >

      <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>

        <div>

          <h1 className='text-2xl font-bold text-blue-500'>
            Breathe ESG
          </h1>

        </div>

        <div className='flex items-center gap-4'>

          <Link
            to='/'
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              location.pathname === '/'
                ? 'bg-blue-600 text-white'
                : darkMode
                  ? 'text-zinc-100 hover:text-blue-400 hover:bg-zinc-800'
                  : 'text-black hover:bg-zinc-200'
            }`}
          >
            Dashboard
          </Link>

          <Link
            to='/upload'
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              location.pathname === '/upload'
                ? 'bg-blue-600 text-white'
                : darkMode
                  ? 'text-zinc-100 hover:text-blue-400 hover:bg-zinc-800'
                  : 'text-black hover:bg-zinc-200'
            }`}
          >
            Upload
          </Link>

          <Link
            to='/audit-logs'
            className={`px-4 py-2 rounded-xl font-semibold transition ${
              location.pathname === '/audit-logs'
                ? 'bg-blue-600 text-white'
                : darkMode
                  ? 'text-zinc-100 hover:text-blue-400 hover:bg-zinc-800'
                  : 'text-black hover:bg-zinc-200'
            }`}
          >
            Audit Logs
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition'
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

        </div>

      </div>

    </nav>

  )
}

export default Navbar