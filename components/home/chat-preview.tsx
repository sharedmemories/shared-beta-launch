import React from 'react';

interface Message {
  text: string;
  isSender: boolean;
  timestamp?: string;
}

interface ChatPreviewProps {
  messages: Message[];
}

export default function ChatPreview({ messages }: ChatPreviewProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.isSender
                  ? 'bg-[#0B84FE] text-white'
                  : 'bg-[#303030] text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              {message.timestamp && (
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 