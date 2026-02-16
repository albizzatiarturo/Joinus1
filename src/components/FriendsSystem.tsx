import { useState } from 'react';
import { UserPlus, Users, X, Check, UserMinus } from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';

export interface Friend {
  id: string;
  name: string;
  image: string;
  verified: boolean;
  mutualFriends?: number;
  status: 'friend' | 'pending' | 'request';
}

interface FriendsSystemProps {
  friends: Friend[];
  onAddFriend: (friendId: string) => void;
  onRemoveFriend: (friendId: string) => void;
  onAcceptRequest: (friendId: string) => void;
  onClose: () => void;
}

export function FriendsSystem({ friends, onAddFriend, onRemoveFriend, onAcceptRequest, onClose }: FriendsSystemProps) {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'suggestions'>('friends');

  const confirmedFriends = friends.filter(f => f.status === 'friend');
  const pendingRequests = friends.filter(f => f.status === 'request');
  const suggestions = friends.filter(f => f.status === 'pending');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Meine Freunde</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('friends')}
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'friends'
                  ? 'border-orange-500 text-orange-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Freunde ({confirmedFriends.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`py-3 border-b-2 transition-colors relative ${
                activeTab === 'requests'
                  ? 'border-orange-500 text-orange-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Anfragen ({pendingRequests.length})
              {pendingRequests.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingRequests.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`py-3 border-b-2 transition-colors ${
                activeTab === 'suggestions'
                  ? 'border-orange-500 text-orange-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Vorschläge
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'friends' && (
            <div className="space-y-3">
              {confirmedFriends.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Noch keine Freunde hinzugefügt</p>
                  <p className="text-sm mt-2">Schaue bei den Vorschlägen vorbei!</p>
                </div>
              ) : (
                confirmedFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={friend.image}
                        alt={friend.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{friend.name}</span>
                          {friend.verified && <VerifiedBadge size="sm" />}
                        </div>
                        {friend.mutualFriends && (
                          <p className="text-sm text-gray-500">
                            {friend.mutualFriends} gemeinsame Freunde
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFriend(friend.id)}
                      className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <UserMinus className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-3">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <UserPlus className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>Keine offenen Anfragen</p>
                </div>
              ) : (
                pendingRequests.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={friend.image}
                        alt={friend.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{friend.name}</span>
                          {friend.verified && <VerifiedBadge size="sm" />}
                        </div>
                        <p className="text-sm text-gray-500">möchte dein Freund sein</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onAcceptRequest(friend.id)}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Akzeptieren
                      </button>
                      <button
                        onClick={() => onRemoveFriend(friend.id)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div className="space-y-3">
              {suggestions.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={friend.image}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{friend.name}</span>
                        {friend.verified && <VerifiedBadge size="sm" />}
                      </div>
                      {friend.mutualFriends && (
                        <p className="text-sm text-gray-500">
                          {friend.mutualFriends} gemeinsame Freunde
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onAddFriend(friend.id)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Hinzufügen
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
