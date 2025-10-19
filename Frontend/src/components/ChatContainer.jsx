import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Messages from './Messages';

const ChatContainer = () => {
  return (
    <div className="flex-1 flex flex-col p-4">
      <h2 className="text-lg font-semibold text-indigo-600 mb-2">
        Chat Container
      </h2>
      <Messages />
      <div className="mt-3 flex items-center gap-2">
        <textarea
          placeholder="Type a message..."
          className="flex-1 resize-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatContainer