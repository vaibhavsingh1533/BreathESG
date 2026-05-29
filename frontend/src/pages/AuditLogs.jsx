import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

import {
  ShieldCheck,
  Clock3,
} from 'lucide-react'

function AuditLogs({ darkMode, setDarkMode }) {

  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {

    try {

      const response = await axios.get(
        'https://breath-esg-backend.onrender.com/api/audit-logs/'
      )

      setLogs(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div
        className={`min-h-screen p-8 transition-all duration-300 ${
          darkMode
            ? 'bg-zinc-950 text-white'
            : 'bg-zinc-100 text-black'
        }`}
      >

        <div className='mb-10'>

          <div className='flex items-center gap-4 mb-4'>

            <div className='bg-green-500 p-4 rounded-2xl text-white'>

              <ShieldCheck size={28} />

            </div>

            <div>

              <h1 className='text-4xl font-bold'>
                Audit Logs
              </h1>

              <p className='text-zinc-400 mt-2'>
                Immutable analyst review and approval history
              </p>

            </div>

          </div>

        </div>

        {
          logs.length === 0 ? (

            <div
              className={`rounded-3xl p-10 text-center ${
                darkMode
                  ? 'bg-zinc-900'
                  : 'bg-white'
              }`}
            >

              <h2 className='text-2xl font-bold mb-3'>
                No Audit Logs Found
              </h2>

              <p className='text-zinc-400'>
                Approve records from the dashboard to generate audit logs.
              </p>

            </div>

          ) : (

            <div className='space-y-5'>

              {
                logs.map((log) => (

                  <div
                    key={log.id}
                    className={`border rounded-3xl p-6 ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-800'
                        : 'bg-white border-zinc-300'
                    }`}
                  >

                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5'>

                      <div>

                        <div className='flex items-center gap-3 mb-4'>

                          <span className='bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold'>
                            {log.action}
                          </span>

                          <span className='bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm'>
                            Record #{log.record}
                          </span>

                        </div>

                        <h2 className='text-2xl font-bold mb-3'>
                          Analyst Action Logged
                        </h2>

                        <p className='text-zinc-400'>
                          Changed by:
                          <span className='ml-2 font-semibold'>
                            {log.changed_by}
                          </span>
                        </p>

                      </div>

                      <div className='flex items-center gap-3 text-zinc-400'>

                        <Clock3 size={18} />

                        {new Date(log.timestamp).toLocaleString()}

                      </div>

                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-8'>

                      <div
                        className={`rounded-2xl p-5 ${
                          darkMode
                            ? 'bg-zinc-800'
                            : 'bg-zinc-100'
                        }`}
                      >

                        <p className='text-zinc-400 mb-3'>
                          Previous State
                        </p>

                        <pre className='overflow-auto text-sm'>
                          {
                            JSON.stringify(
                              log.old_value,
                              null,
                              2
                            )
                          }
                        </pre>

                      </div>

                      <div
                        className={`rounded-2xl p-5 ${
                          darkMode
                            ? 'bg-zinc-800'
                            : 'bg-zinc-100'
                        }`}
                      >

                        <p className='text-zinc-400 mb-3'>
                          New State
                        </p>

                        <pre className='overflow-auto text-sm'>
                          {
                            JSON.stringify(
                              log.new_value,
                              null,
                              2
                            )
                          }
                        </pre>

                      </div>

                    </div>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

    </>

  )
}

export default AuditLogs