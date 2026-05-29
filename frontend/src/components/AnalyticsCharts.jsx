import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'


function AnalyticsCharts({ darkMode, records }) {

  const scopeData = [
    {
      name: 'Scope 1',
      value: records.length
    },
    {
      name: 'Scope 2',
      value: 4
    },
    {
      name: 'Scope 3',
      value: 7
    }
  ]


  const emissionsData = [
    {
      month: 'Jan',
      emissions: 240
    },
    {
      month: 'Feb',
      emissions: 310
    },
    {
      month: 'Mar',
      emissions: 420
    },
    {
      month: 'Apr',
      emissions: 380
    },
    {
      month: 'May',
      emissions: 510
    }
  ]


  const COLORS = [
    '#3b82f6',
    '#22c55e',
    '#eab308',
  ]


  return (

    <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8'>

      {/* PIE CHART */}

      <div
        className={`border rounded-3xl p-6 ${
          darkMode
            ? 'bg-zinc-900 border-zinc-800'
            : 'bg-white border-zinc-300'
        }`}
      >

        <h2 className='text-2xl font-bold mb-6'>
          Scope Distribution
        </h2>

        <div className='h-80'>

          <ResponsiveContainer width='100%' height='100%'>

            <PieChart>

              <Pie
                data={scopeData}
                dataKey='value'
                outerRadius={110}
                label
              >

                {
                  scopeData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* BAR CHART */}

      <div
        className={`border rounded-3xl p-6 ${
          darkMode
            ? 'bg-zinc-900 border-zinc-800'
            : 'bg-white border-zinc-300'
        }`}
      >

        <h2 className='text-2xl font-bold mb-6'>
          Monthly Emissions
        </h2>

        <div className='h-80'>

          <ResponsiveContainer width='100%' height='100%'>

            <BarChart data={emissionsData}>

              <XAxis dataKey='month' />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey='emissions'
                fill='#3b82f6'
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}

export default AnalyticsCharts