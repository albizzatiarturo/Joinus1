import { useState, useEffect, useRef } from 'react';
import { X, Send, Smile } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface ChatUser {
  id: string;
  name: string;
  image: string;
  verified: boolean;
  online?: boolean;
}

interface ChatModalProps {
  currentUser: ChatUser;
  otherUser: ChatUser;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onClose: () => void;
}

export function ChatModal({ currentUser, otherUser, messages, onSendMessage, onClose }: ChatModalProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={otherUser.image}
                alt={otherUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {otherUser.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{otherUser.name}</span>
                {otherUser.verified && <VerifiedBadge size="sm" />}
              </div>
              {otherUser.online && (
                <span className="text-xs text-green-600">Online</span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Noch keine Nachrichten</p>
              <p className="text-sm mt-2">Starte die Konversation! 👋</p>
            </div>
          ) : (
            messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id;
              const user = isCurrentUser ? currentUser : otherUser;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div
                    className={`max-w-[70%] ${
                      isCurrentUser ? 'items-end' : 'items-start'
                    } flex flex-col gap-1`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isCurrentUser
                          ? 'bg-orange-500 text-white rounded-br-sm'
                          : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 px-2">
                      {new Date(message.timestamp).toLocaleTimeString('de-CH', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nachricht schreiben..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
