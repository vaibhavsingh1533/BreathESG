import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import {
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'

function RecordModal({

  selectedRecord,
  setSelectedRecord,
  darkMode,

}) {

  if (!selectedRecord) return null

  const [note, setNote] = useState(
    selectedRecord.analyst_notes || ''
  )

  const saveNote = async () => {

    try {

      await axios.post(
        `https://breath-esg-backend.onrender.com/${selectedRecord.id}/note/`,
        {
          note
        }
      )

      toast.success('Analyst note saved')

    } catch (error) {

      console.log(error)

      toast.error('Failed to save note')
    }
  }

  return (

    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto'>

      <div
        className={`w-full max-w-xl rounded-2xl border p-5 ${
          darkMode
            ? 'bg-zinc-900 border-zinc-800 text-white'
            : 'bg-white border-zinc-300 text-black'
        }`}
      >

        {/* HEADER */}

        <div className='flex items-center gap-3 mb-5'>

          <button
            onClick={() => setSelectedRecord(null)}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              darkMode
                ? 'bg-zinc-800 hover:bg-zinc-700'
                : 'bg-zinc-200 hover:bg-zinc-300'
            }`}
          >
            ← Back
          </button>

          <div>

            <h2 className='text-xl font-bold'>
              ESG Record Details
            </h2>

            <p className='text-zinc-400 text-sm'>
              Analyst review panel
            </p>

            {
              selectedRecord.locked_for_audit && (
                <div className='mt-1 inline-block bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold'>
                  Locked For Audit
                </div>
              )
            }

          </div>

        </div>

        {/* DETAILS */}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          <div>
            <p className='text-zinc-400 text-sm'>Category</p>
            <h3 className='font-semibold'>
              {selectedRecord.category}
            </h3>
          </div>

          <div>
            <p className='text-zinc-400 text-sm'>Scope</p>
            <h3 className='font-semibold'>
              {selectedRecord.scope}
            </h3>
          </div>

          <div>
            <p className='text-zinc-400 text-sm'>Activity Value</p>
            <h3 className='font-semibold'>
              {selectedRecord.activity_value}
            </h3>
          </div>

          <div>
            <p className='text-zinc-400 text-sm'>Unit</p>
            <h3 className='font-semibold'>
              {selectedRecord.normalized_unit}
            </h3>
          </div>

          <div>
            <p className='text-zinc-400 text-sm'>Emission Factor</p>
            <h3 className='font-semibold'>
              {selectedRecord.emission_factor}
            </h3>
          </div>

          <div>
            <p className='text-zinc-400 text-sm'>CO₂e</p>
            <h3 className='font-semibold'>
              {selectedRecord.co2e_emission}
            </h3>
          </div>

        </div>

        {/* SOURCE */}

        <div className='mt-6'>

          <h3 className='font-bold mb-3'>
            Source Metadata
          </h3>

          <div className='space-y-3'>

            <div>
              <p className='text-zinc-400 text-sm'>
                Source Type
              </p>

              <p>
                {selectedRecord.source_type}
              </p>
            </div>

            <div>
              <p className='text-zinc-400 text-sm'>
                Source File
              </p>

              <p className='break-all'>
                {selectedRecord.source_name}
              </p>
            </div>

          </div>

        </div>

        {/* NOTES */}

        <div className='mt-6'>

          <h3 className='font-bold mb-3'>
            Analyst Notes
          </h3>

          <textarea
            disabled={selectedRecord.locked_for_audit}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder='Add analyst review notes...'
            className={`w-full rounded-xl p-4 border outline-none resize-none ${
              darkMode
                ? 'bg-zinc-800 border-zinc-700'
                : 'bg-zinc-100 border-zinc-300'
            }`}
          />

          <button
            onClick={saveNote}
            disabled={selectedRecord.locked_for_audit}
            className={`mt-3 px-5 py-2 rounded-xl text-white font-semibold transition ${
              selectedRecord.locked_for_audit
                ? 'bg-zinc-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Save Note
          </button>

        </div>

        {/* VALIDATION */}

        <div className='mt-6'>

          <h3 className='font-bold mb-3'>
            Validation Status
          </h3>

          {
            selectedRecord.validation_flags.length > 0 ? (

              <div className='space-y-2'>

                {
                  selectedRecord.validation_flags.map((flag, index) => (

                    <div
                      key={index}
                      className='bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 p-3 rounded-xl flex items-center gap-2'
                    >

                      <AlertTriangle size={16} />

                      {flag}

                    </div>

                  ))
                }

              </div>

            ) : (

              <div className='bg-green-500/10 text-green-400 border border-green-500/20 p-3 rounded-xl flex items-center gap-2'>

                <CheckCircle size={16} />

                Record passed all validation checks

              </div>

            )
          }

        </div>

      </div>

    </div>
  )
}

export default RecordModal