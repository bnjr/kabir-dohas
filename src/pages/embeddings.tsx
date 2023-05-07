import React, {useState} from 'react'

type LogEntry = {
  type: 'info' | 'error'
  message: string
  details?: string
}

const ManageEmbeddings = () => {
  const [logs, setLogs] = useState<LogEntry[]>([])

  const addLog = (log: LogEntry) => {
    setLogs((prevLogs) => [...prevLogs, log])
  }

  const saveEmbeddings = async () => {
    setLogs(() => [])
    try {
      const response = await fetch('/api/saveembeddings', {
        method: 'POST',
      })

      if (response.ok) {
        addLog({type: 'info', message: 'Embeddings saved successfully!'})
      } else {
        throw new Error(`Error: ${response.statusText}`)
      }
    } catch (error) {
      addLog({
        type: 'error',
        message: 'Error saving embeddings',
        details: (error as Error).message,
      })
    }
  }

  const checkEmbeddings = async () => {
    setLogs(() => [])
    try {
      const response = await fetch('/api/checkembeddings', {
        method: 'GET',
      })

      if (response.ok) {
        addLog({type: 'info', message: 'Embeddings loaded successfully!'})
      } else {
        throw new Error(`Error: ${response.statusText}`)
      }
    } catch (error) {
      addLog({
        type: 'error',
        message: 'Error checking embeddings',
        details: (error as Error).message,
      })
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Manage Embeddings</h1>
      <div>
        <button
          onClick={saveEmbeddings}
          className='bg-blue-600 text-white py-2 px-4 rounded mr-4 hover:bg-blue-700'
        >
          Save Embeddings
        </button>
        <button
          onClick={checkEmbeddings}
          className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
        >
          Check Embeddings
        </button>
      </div>
      <div className='mt-8 w-full max-w-xl'>
        {logs.map((log, index) => (
          <div
            key={index}
            className={`border-l-4 p-4 mb-4 ${
              log.type === 'info' ? 'border-blue-600' : 'border-red-600'
            }`}
          >
            <p className='font-bold'>{log.message}</p>
            {log.details && (
              <details>
                <summary className='cursor-pointer text-sm text-blue-800 mt-2'>
                  Details
                </summary>
                <pre className='text-xs whitespace-pre-wrap'>{log.details}</pre>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageEmbeddings
