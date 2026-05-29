
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'

import {
  UploadCloud,
  Moon,
  Sun,
} from 'lucide-react'


function UploadPage({ darkMode, setDarkMode }) {

  const [file, setFile] = useState(null)

  const [loading, setLoading] = useState(false)

  const [dragActive, setDragActive] = useState(false)
  const [uploadSummary, setUploadSummary] = useState(null)
const [activeSource, setActiveSource] = useState('SAP')

  const handleDragOver = (e) => {

    e.preventDefault()

    setDragActive(true)
  }


  const handleDragLeave = () => {

    setDragActive(false)
  }


  const handleDrop = (e) => {

    e.preventDefault()

    setDragActive(false)

    const droppedFile = e.dataTransfer.files[0]

    if (droppedFile) {
      setFile(droppedFile)
    }
  }


  const uploadFile = async () => {

    if (!file) {
      return toast.error('Please select a file')
    }

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append('file', file)


const endpoint =

  activeSource === 'SAP'
    ? 'https://breath-esg-backend.onrender.com/api/upload/sap/'

    : activeSource === 'UTILITY'
      ? 'https://breath-esg-backend.onrender.com/api/upload/utility/'

      : 'https://breath-esg-backend.onrender.com/api/upload/travel/'


const response = await axios.post(
  endpoint,
  formData
)

setUploadSummary(response.data)



      toast.success('File uploaded successfully')

    } catch (error) {

      console.log(error)

      toast.error('Upload failed')

    } finally {

      setLoading(false)

    }
  }


  return (
 
    <>
  <Navbar
    darkMode={darkMode}
    setDarkMode={setDarkMode}
  />
     

    <div
      className={`min-h-screen flex items-center justify-center px-6 relative transition-all duration-300 ${
        darkMode
          ? 'bg-zinc-950 text-white'
          : 'bg-zinc-100 text-black'
      }`}
    >

      {/* THEME BUTTON */}

      <div className='absolute top-6 right-6'>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`transition p-3 rounded-2xl ${
            darkMode
              ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
              : 'bg-white hover:bg-zinc-200 border border-zinc-300'
          }`}
        >

          {
            darkMode
              ? <Sun size={22} />
              : <Moon size={22} />
          }

        </button>

      </div>


      {/* CARD */}

      <div
        className={`w-full max-w-xl border rounded-3xl p-10 ${
          darkMode
            ? 'bg-zinc-900 border-zinc-800'
            : 'bg-white border-zinc-300'
        }`}
      >

        {/* HEADER */}

        <div className='flex items-center gap-4 mb-8'>

          <div className='bg-blue-600 p-4 rounded-2xl text-white'>

            <UploadCloud size={30} />

          </div>

          <div>

            <h1 className='text-3xl font-bold'>
              Upload ESG Data
            </h1>

            <p className='text-zinc-400 mt-1'>
              Upload SAP fuel or procurement export
            </p>

          </div>

        </div>

        <div className='grid grid-cols-3 gap-3 mb-6'>

  {
    ['SAP', 'UTILITY', 'TRAVEL'].map((source) => (

      <button
        key={source}
        onClick={() => setActiveSource(source)}
        className={`py-4 rounded-2xl font-semibold transition ${
          activeSource === source
            ? 'bg-blue-600 text-white'
            : darkMode
              ? 'bg-zinc-800 hover:bg-zinc-700'
              : 'bg-zinc-100 hover:bg-zinc-200'
        }`}
      >

        {source}

      </button>

    ))
  }

</div>


        {/* DRAG DROP */}

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mb-6 border-2 border-dashed rounded-3xl p-10 text-center transition-all ${
            dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : darkMode
                ? 'border-zinc-700 bg-zinc-800'
                : 'border-zinc-300 bg-zinc-100'
          }`}
        >

          <UploadCloud
            size={55}
            className='mx-auto mb-5 text-blue-500'
          />

          <h2 className='text-2xl font-bold mb-3'>
            {activeSource} Data Upload
          </h2>

          <p className='text-zinc-400 mb-5'>
            {
  activeSource === 'SAP'
    ? 'Upload SAP fuel or procurement exports'
    : activeSource === 'UTILITY'
      ? 'Upload electricity utility datasets'
      : 'Upload travel emissions exports'
}
          </p>


          <input
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
            className='hidden'
            id='fileUpload'
          />


          <label
            htmlFor='fileUpload'
            className='bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-2xl cursor-pointer inline-block text-white font-semibold'
          >

            Browse Files

          </label>


          {
            file && (

              <div className='mt-6 text-green-500 font-semibold'>

                Selected:
                <span className='ml-2'>
                  {file.name}
                </span>

              </div>

            )
          }

        </div>

        {
  uploadSummary && (

    <div
      className={`mb-6 border rounded-3xl p-6 ${
        darkMode
          ? 'bg-zinc-800 border-zinc-700'
          : 'bg-zinc-100 border-zinc-300'
      }`}
    >

      <h2 className='text-2xl font-bold mb-5'>
        Upload Summary
      </h2>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

        <div>

          <p className='text-zinc-400 mb-2'>
            Status
          </p>

          <div className='text-green-500 font-semibold'>
            Success
          </div>

        </div>


        <div>

          <p className='text-zinc-400 mb-2'>
            Records Processed
          </p>

          <div className='font-semibold'>
            {uploadSummary.records_processed}
          </div>

        </div>


        <div>

          <p className='text-zinc-400 mb-2'>
            Source Type
          </p>

          <div className='font-semibold'>
            {activeSource} Dataset
          </div>

        </div>


        <div>

          <p className='text-zinc-400 mb-2'>
            Normalization
          </p>

          <div className='text-blue-500 font-semibold'>
            Completed
          </div>

        </div>

      </div>

    </div>

  )
}


        {/* BUTTON */}

        <button
          onClick={uploadFile}
          disabled={loading}
          className='w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-semibold text-lg text-white'
        >

          {
            loading
              ? 'Uploading...'
              : 'Upload File'
          }

        </button>

      </div>

    </div>

    </>
  )
}

export default UploadPage
