import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Messages from './Messages';
import { UserDataContext } from '../context/UserContext';

const ChatContainer = ({ selectedChat }) => {
  const { user } = useContext(UserDataContext);

  if (!selectedChat)
    return <div className="flex-1 flex flex-col p-4">
      <h2 className="text-lg text-center font-semibold text-indigo-600 mb-2">Select A Person To Chat with!!!</h2>
    </div>

  return (
    <div className="flex-1 flex flex-col p-4">
      <h2 className="text-lg font-semibold text-indigo-600 mb-2">
        Chat Container
      </h2>
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-200 mb-3">
        {(selectedChat?.email === user?.userData?.email) ? <h3 className="font-semibold mb-2">This is Your Chat - Have Fun with Talking with yourself</h3> :
          <h3 className="font-semibold mb-2">{selectedChat?.email} is here to Chat with</h3>}
        <div>
          {/* {Have to Map messages here} */}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <textarea
          placeholder="Type a message..."
          className="flex-1 resize-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatContainer