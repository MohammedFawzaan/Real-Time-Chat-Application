import React from 'react'

const Messages = () => {
  return (
    <div className="flex-1 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-200 mb-3">
        <h3 className="font-semibold mb-2">All Messages in the Chat appear here</h3>
        <div>{/* Map messages here */}</div>
    </div>
  )
}

export default Messages