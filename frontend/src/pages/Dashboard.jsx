import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RecordModal from '../components/RecordModal'
import AnalyticsCharts from '../components/AnalyticsCharts'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'



import {
  CheckCircle,
  AlertTriangle,
  Database,
  Moon,
  Sun,
  UploadCloud,
  LayoutDashboard,
  ShieldCheck,
  Activity,
  Menu,
} from 'lucide-react'


function Dashboard({ darkMode, setDarkMode }) {

  const [records, setRecords] = useState([])
const [loading, setLoading] = useState(true)

  const [selectedRecord, setSelectedRecord] = useState(null)

  const [search, setSearch] = useState('')

const [scopeFilter, setScopeFilter] = useState('ALL')
const [organization, setOrganization] = useState(
  'Demo Enterprise'
)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetchRecords()
  }, [])

const fetchRecords = async () => {

  try {

    setLoading(true)

    const response = await axios.get(
      'http://127.0.0.1:8000/api/review/'
    )

    setRecords(response.data)

  } catch (error) {

    console.log(error)

  } finally {

    setLoading(false)
  }
}


  const approveRecord = async (id) => {

    try {

      await axios.post(
        `http://127.0.0.1:8000/api/review/${id}/approve/`
      )

      fetchRecords()
      toast.success('Record approved')

    } catch (error) {
      console.log(error)
    }
  }

  const totalEmissions = records.reduce(

  (sum, record) => (
    sum + record.co2e_emission
  ),

  0
)


const approvedRecords = records.filter(

  (record) => (
    record.locked_for_audit
  )

).length


const pendingRecords = records.filter(

  (record) => (
    !record.locked_for_audit
  )

).length


const reviewCompletion = records.length > 0

  ? Math.round(
      (approvedRecords / records.length) * 100
    )

  : 0

  const filteredRecords = records.filter((record) => {

  const matchesSearch =
    record.category
      .toLowerCase()
      .includes(search.toLowerCase())

  const matchesScope =
    scopeFilter === 'ALL'
      ? true
      : record.scope === scopeFilter

  return matchesSearch && matchesScope
})


  return (
<>
    <Navbar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>

    <div
      className={`min-h-screen flex transition-all duration-300 ${
        darkMode
          ? 'bg-zinc-950 text-white'
          : 'bg-zinc-100 text-black'
      }`}
    >

      {/* MOBILE OVERLAY */}

      {
        sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className='fixed inset-0 bg-black/50 z-40 lg:hidden'
          />
        )
      }


      {/* SIDEBAR */}

      <div
        className={`fixed lg:static top-0 left-0 h-screen w-72 z-50 transform transition-transform duration-300 ${
          sidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        } ${
          darkMode
            ? 'bg-zinc-900 border-zinc-800'
            : 'bg-white border-zinc-300'
        } border-r p-6 flex flex-col justify-between`}
      >

        <div>

          <div className='mb-10'>

            <h1 className='text-3xl font-bold'>
              Breathe ESG
            </h1>

            <p className='text-zinc-400 mt-2'>
              Enterprise ESG Platform
            </p>

          </div>


          <div className='space-y-3'>

            <div
              className={`flex items-center gap-3 p-4 rounded-2xl ${
                darkMode
                  ? 'bg-zinc-800'
                  : 'bg-zinc-200'
              }`}
            >

              <LayoutDashboard size={20} />

              Dashboard

            </div>


            <Link
              to='/upload'
              className={`flex items-center gap-3 p-4 rounded-2xl transition ${
                darkMode
                  ? 'hover:bg-zinc-800'
                  : 'hover:bg-zinc-200'
              }`}
            >

              <UploadCloud size={20} />

              Upload Data

            </Link>


           <Link
  to='/audit-logs'
  className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition ${
    darkMode
      ? 'hover:bg-zinc-800'
      : 'hover:bg-zinc-200'
  }`}
>

  <ShieldCheck size={20} />

  Audit Logs

</Link>

          </div>

        </div>


        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`transition p-4 rounded-2xl flex items-center justify-center ${
            darkMode
              ? 'bg-zinc-800 hover:bg-zinc-700'
              : 'bg-zinc-200 hover:bg-zinc-300'
          }`}
        >

          {
            darkMode
              ? <Sun size={22} />
              : <Moon size={22} />
          }

        </button>

      </div>


      {/* MAIN */}

      <div className='flex-1 p-4 md:p-8 lg:ml-0'>

        {/* TOPBAR MOBILE */}

        <div className='flex items-center justify-between mb-6 lg:hidden'>

          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-3 rounded-2xl ${
              darkMode
                ? 'bg-zinc-800'
                : 'bg-white border border-zinc-300'
            }`}
          >

            <Menu size={22} />

          </button>


          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-2xl ${
              darkMode
                ? 'bg-zinc-800'
                : 'bg-white border border-zinc-300'
            }`}
          >

            {
              darkMode
                ? <Sun size={20} />
                : <Moon size={20} />
            }

          </button>

        </div>

        <div
  className={`border rounded-3xl p-6 mb-8 ${
    darkMode
      ? 'bg-zinc-900 border-zinc-800'
      : 'bg-white border-zinc-300'
  }`}
>

  <div className='flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6'>

    <div>

      <p className='text-zinc-400 mb-2'>
        Active Organization
      </p>

      <h2 className='text-3xl font-bold'>
        {organization}
      </h2>

    </div>


    <div className='flex flex-wrap gap-4'>

      <div
        className={`px-5 py-4 rounded-2xl ${
          darkMode
            ? 'bg-zinc-800'
            : 'bg-zinc-100'
        }`}
      >

        <p className='text-zinc-400 text-sm mb-1'>
          Total Emissions
        </p>

        <h3 className='text-2xl font-bold'>
          {totalEmissions.toFixed(2)} kgCO2e
        </h3>

      </div>


      <div
        className={`px-5 py-4 rounded-2xl ${
          darkMode
            ? 'bg-zinc-800'
            : 'bg-zinc-100'
        }`}
      >

        <p className='text-zinc-400 text-sm mb-1'>
          Review Completion
        </p>

        <h3 className='text-2xl font-bold'>
          {reviewCompletion}%
        </h3>

        <div
  className={`px-5 py-4 rounded-2xl ${
    darkMode
      ? 'bg-zinc-800'
      : 'bg-zinc-100'
  }`}
>

  <p className='text-zinc-400 text-sm mb-1'>
    Pending Reviews
  </p>

  <h3 className='text-2xl font-bold'>
    {pendingRecords}
  </h3>

</div>

      </div>


      <div
        className={`px-5 py-4 rounded-2xl ${
          darkMode
            ? 'bg-zinc-800'
            : 'bg-zinc-100'
        }`}
      >

        <p className='text-zinc-400 text-sm mb-1'>
          Audit Readiness
        </p>

        <h3 className='text-2xl font-bold text-green-500'>
          {
  pendingRecords === 0
    ? 'Ready'
    : 'In Review'
}
        </h3>

      </div>

    </div>

  </div>

</div>


        {/* HEADER */}

        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8'>

          <div>

            <h1 className='text-3xl md:text-4xl font-bold'>
              Emissions Review Queue
            </h1>

            <p className='text-zinc-400 mt-2'>
              Review, validate, and approve ESG records before audit lock.
            </p>

          </div>

<select
  value={organization}
  onChange={(e) => setOrganization(e.target.value)}
  className={`px-5 py-4 rounded-2xl border outline-none ${
    darkMode
      ? 'bg-zinc-900 border-zinc-800'
      : 'bg-white border-zinc-300'
  }`}
>

  <option>
    Demo Enterprise
  </option>

  <option>
    Global Manufacturing Ltd
  </option>

  <option>
    Carbon Logistics Group
  </option>

</select>

          <Link
            to='/upload'
            className='bg-blue-600 hover:bg-blue-700 transition px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-white'
          >

            <UploadCloud size={20} />

            Upload New Data

          </Link>

        </div>

        <div className='flex flex-col lg:flex-row gap-4 mb-8'>

  <input
    type='text'
    placeholder='Search category...'
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className={`flex-1 px-5 py-4 rounded-2xl border outline-none ${
      darkMode
        ? 'bg-zinc-900 border-zinc-800'
        : 'bg-white border-zinc-300'
    }`}
  />


  <select
    value={scopeFilter}
    onChange={(e) => setScopeFilter(e.target.value)}
    className={`px-5 py-4 rounded-2xl border outline-none ${
      darkMode
        ? 'bg-zinc-900 border-zinc-800'
        : 'bg-white border-zinc-300'
    }`}
  >

    <option value='ALL'>
      All Scopes
    </option>

    <option value='Scope 1'>
      Scope 1
    </option>

    <option value='Scope 2'>
      Scope 2
    </option>

    <option value='Scope 3'>
      Scope 3
    </option>

  </select>

</div>


        {/* CARDS */}

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8'>

          {
            [
              {
                title: 'Pending Review',
                value: records.length,
                icon: <Database size={36} />
              },
              {
                title: 'Validation Flags',
                value: 9,
                icon: <AlertTriangle size={36} />
              },
              {
                title: 'Approved Records',
                value: 118,
                icon: <CheckCircle size={36} />
              },
              {
                title: 'Active Pipelines',
                value: 3,
                icon: <Activity size={36} />
              }
            ].map((card, index) => (

              <div
                key={index}
                className={`border rounded-3xl p-6 ${
                  darkMode
                    ? 'bg-zinc-900 border-zinc-800'
                    : 'bg-white border-zinc-300'
                }`}
              >

                <div className='flex items-center justify-between'>

                  <div>

                    <p className='text-zinc-400'>
                      {card.title}
                    </p>

                    <h2 className='text-4xl font-bold mt-3'>
                      {card.value}
                    </h2>

                  </div>

                  {card.icon}

                </div>

              </div>

            ))
          }

        </div>
        <AnalyticsCharts
  darkMode={darkMode}
  records={records}
/>

{
  loading && (

    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8'>

      {
        [1, 2, 3].map((item) => (

          <div
            key={item}
            className={`h-40 rounded-3xl animate-pulse ${
              darkMode
                ? 'bg-zinc-900'
                : 'bg-white'
            }`}
          />

        ))
      }

    </div>

  )
}

        {/* TABLE */}

        <div
          className={`border rounded-3xl overflow-hidden ${
            darkMode
              ? 'bg-zinc-900 border-zinc-800'
              : 'bg-white border-zinc-300'
          }`}
        >

          <div className='overflow-x-auto'>

            <table className='w-full min-w-[900px]'>

              <thead
                className={
                  darkMode
                    ? 'bg-zinc-800'
                    : 'bg-zinc-200'
                }
              >

                <tr>

                  <th className='text-left p-5'>Category</th>

                  <th className='text-left p-5'>Scope</th>

                  <th className='text-left p-5'>Source</th>

                  <th className='text-left p-5'>Emission</th>

                  <th className='text-left p-5'>Validation</th>

                  <th className='text-left p-5'>Status</th>

                  <th className='text-left p-5'>Action</th>

                </tr>

              </thead>


<tbody>

  {
    filteredRecords.length === 0 && !loading && (

      <tr>

        <td
          colSpan='7'
          className='text-center py-20'
        >

          <div className='flex flex-col items-center justify-center'>

            <Database
              size={60}
              className='text-zinc-500 mb-5'
            />

            <h2 className='text-2xl font-bold mb-3'>
              No ESG Records Found
            </h2>

            <p className='text-zinc-400'>
              Upload ESG datasets to begin analyst review workflow.
            </p>

          </div>

        </td>

      </tr>

    )
  }


  {
    filteredRecords.map((record) => (

      <tr
        key={record.id}
        className={`border-t transition ${
          darkMode
            ? 'border-zinc-800 hover:bg-zinc-800'
            : 'border-zinc-300 hover:bg-zinc-100'
        }`}
      >

        <td className='p-5 font-medium'>
          {record.category}
        </td>


        <td className='p-5'>

          <span className='bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm'>
            {record.scope}
          </span>

        </td>


        <td className='p-5'>

          <span className='bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm'>
            {record.source_type}
          </span>

        </td>


        <td className='p-5 font-semibold'>
          {record.co2e_emission.toFixed(2)} kgCO2e
        </td>


        <td className='p-5'>

          {
            record.validation_flags.length > 0 ? (

              <div className='flex items-center gap-2 text-yellow-500'>

                <AlertTriangle size={18} />

                Warning

              </div>

            ) : (

              <div className='flex items-center gap-2 text-green-500'>

                <CheckCircle size={18} />

                Clean

              </div>

            )
          }

        </td>


        <td className='p-5'>

          <span className='bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm'>
            Pending
          </span>

        </td>


        <td className='p-5'>

          <div className='flex items-center gap-3'>

            <button
              onClick={() => setSelectedRecord(record)}
              className='bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-xl font-semibold text-white'
            >
              View
            </button>


            <button
              onClick={() => approveRecord(record.id)}
              className='bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-xl font-semibold text-white'
            >
              Approve
            </button>

          </div>

        </td>

      </tr>

    ))
  }

</tbody>



            </table>

          </div>

        </div>

      </div>

      <RecordModal
  selectedRecord={selectedRecord}
  setSelectedRecord={setSelectedRecord}
  darkMode={darkMode}
/>

    </div>
    </>
  )
}

export default Dashboard