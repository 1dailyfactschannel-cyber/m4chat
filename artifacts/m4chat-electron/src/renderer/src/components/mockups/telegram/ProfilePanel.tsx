import React from 'react';
import { 
  X, Pencil, Phone, Video, Bell, BellOff, 
  Camera, Info, UserCheck, Shield, Trash2, Check, 
  Image as ImageIcon, ChevronRight
} from 'lucide-react';
import { useUserStore } from '../../../store/userStore';
import { clsx } from 'clsx';

export function ProfilePanel() {
  const {
    currentUser,
    isEditing,
    isProfileOpen,
    editForm,
    closeProfile,
    startEditing,
    cancelEditing,
    saveProfile,
    updateEditForm,
  } = useUserStore();

  if (!isProfileOpen) return null;

  const handleSave = () => {
    saveProfile({
      name: editForm.name,
      username: editForm.username,
      bio: editForm.bio,
      phone: editForm.phone,
    });
  };

  const bg = {
    panel: 'rgba(28, 28, 30, 1)',
    panelBorder: 'rgba(44, 44, 46, 1)',
    text: 'rgba(255, 255, 255, 1)',
    textSec: 'rgba(142, 142, 147, 1)',
  };

  return (
    <div 
      className="w-[320px] shrink-0 flex flex-col h-full overflow-hidden animate-slideInRight"
      style={{ background: bg.panel, borderLeft: `1px solid ${bg.panelBorder}` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-[54px] shrink-0" style={{ borderBottom: `1px solid ${bg.panelBorder}` }}>
        <span className="font-semibold text-[15px]" style={{ color: bg.text }}>Профиль</span>
        <button 
          onClick={closeProfile}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" style={{ color: bg.textSec }} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Avatar Section */}
        <div className="flex flex-col items-center px-4 pt-8 pb-4">
          <div className="relative group cursor-pointer">
            <div 
              className={clsx(
                "w-[120px] h-[120px] rounded-full flex items-center justify-center text-white font-bold text-4xl",
                `bg-gradient-to-br ${currentUser.color}`
              )}
            >
              {currentUser.avatar}
            </div>
            {isEditing ? (
              <label className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
                <input type="file" accept="image/*" className="hidden" />
              </label>
            ) : (
              <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mt-4 flex items-center gap-2">
            {isEditing ? (
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => updateEditForm({ name: e.target.value })}
                className="bg-transparent border-b border-[#2481CC] text-center text-[20px] font-bold outline-none"
                style={{ color: bg.text }}
                placeholder="Имя"
              />
            ) : (
              <h2 className="text-[20px] font-bold" style={{ color: bg.text }}>{currentUser.name}</h2>
            )}
          </div>

          {/* Status */}
          <span className="text-[14px] mt-1" style={{ color: currentUser.statusColor }}>
            {currentUser.status}
          </span>

          {/* Edit Button (only when not editing) */}
          {!isEditing && (
            <button
              onClick={startEditing}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full bg-[#2481CC] text-white text-[14px] font-medium hover:bg-[#1a6aa8] transition-colors"
            >
              <Pencil className="w-4 h-4" />
              Редактировать
            </button>
          )}
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex items-center justify-center gap-3 px-4 pb-4">
            <button
              onClick={cancelEditing}
              className="px-4 py-2 rounded-full text-[14px] font-medium hover:bg-white/10 transition-colors"
              style={{ color: bg.textSec }}
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-full bg-[#2481CC] text-white text-[14px] font-medium hover:bg-[#1a6aa8] transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Сохранить
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="px-4 space-y-4">
          {/* Phone */}
          <div className="py-3" style={{ borderTop: `1px solid ${bg.panelBorder}` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2481CC]/20 flex items-center justify-center">
                <Phone className="w-5 h-5" style={{ color: '#2481CC' }} />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => updateEditForm({ phone: e.target.value })}
                    className="bg-transparent text-[14px] outline-none w-full"
                    style={{ color: bg.text }}
                    placeholder="Телефон"
                  />
                ) : (
                  <div className="text-[14px]" style={{ color: bg.text }}>{currentUser.phone || 'Не указан'}</div>
                )}
                <div className="text-[11px]" style={{ color: bg.textSec }}>Мобильный</div>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className="py-3" style={{ borderTop: `1px solid ${bg.panelBorder}` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2481CC]/20 flex items-center justify-center">
                <UserCheck className="w-5 h-5" style={{ color: '#2481CC' }} />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => updateEditForm({ username: e.target.value })}
                    className="bg-transparent text-[14px] outline-none w-full"
                    style={{ color: bg.text }}
                    placeholder="@username"
                  />
                ) : (
                  <div className="text-[14px]" style={{ color: bg.text }}>{currentUser.username || 'Не указан'}</div>
                )}
                <div className="text-[11px]" style={{ color: bg.textSec }}>Имя пользователя</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="py-3" style={{ borderTop: `1px solid ${bg.panelBorder}` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2481CC]/20 flex items-center justify-center">
                <Info className="w-5 h-5" style={{ color: '#2481CC' }} />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => updateEditForm({ bio: e.target.value })}
                    className="bg-transparent text-[14px] outline-none w-full resize-none"
                    style={{ color: bg.text }}
                    placeholder="О себе"
                    rows={3}
                  />
                ) : (
                  <div className="text-[14px] leading-snug" style={{ color: bg.text }}>{currentUser.bio || 'Не указано'}</div>
                )}
                <div className="text-[11px]" style={{ color: bg.textSec }}>О себе</div>
              </div>
            </div>
          </div>

          {/* Notifications Toggle */}
          <div 
            className="py-3 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors rounded-lg px-2 -mx-2"
            style={{ borderTop: `1px solid ${bg.panelBorder}` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2481CC]/20 flex items-center justify-center">
                <Bell className="w-5 h-5" style={{ color: '#2481CC' }} />
              </div>
              <span className="text-[14px]" style={{ color: bg.text }}>Уведомления</span>
            </div>
            <div className="w-11 h-7 rounded-full bg-[#34C759] relative">
              <div className="absolute right-1 top-1 w-5 h-5 rounded-full bg-white shadow" />
            </div>
          </div>

          {/* Shared Media */}
          <div style={{ borderTop: `1px solid ${bg.panelBorder}` }}>
            <div className="py-3">
              <div className="flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors rounded-lg px-2 -mx-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2481CC]/20 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" style={{ color: '#2481CC' }} />
                  </div>
                  <span className="text-[14px]" style={{ color: bg.text }}>Медиа</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[14px]" style={{ color: bg.textSec }}>12</span>
                  <ChevronRight className="w-4 h-4" style={{ color: bg.textSec }} />
                </div>
              </div>
            </div>
            
            {/* Media Grid */}
            <div className="grid grid-cols-3 gap-1 pb-2">
              {['from-purple-400 to-pink-400', 'from-blue-400 to-cyan-400', 'from-green-400 to-teal-400', 'from-orange-400 to-red-400', 'from-indigo-400 to-purple-400', 'from-yellow-400 to-orange-400'].map((gradient, i) => (
                <div 
                  key={i}
                  className={clsx("h-16 rounded-lg bg-gradient-to-tr cursor-pointer hover:opacity-80 transition-opacity", gradient)}
                />
              ))}
            </div>
          </div>

          {/* Privacy & Security */}
          <div 
            className="py-3 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors rounded-lg px-2 -mx-2"
            style={{ borderTop: `1px solid ${bg.panelBorder}` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2481CC]/20 flex items-center justify-center">
                <Shield className="w-5 h-5" style={{ color: '#2481CC' }} />
              </div>
              <span className="text-[14px]" style={{ color: bg.text }}>Конфиденциальность и безопасность</span>
            </div>
            <ChevronRight className="w-4 h-4" style={{ color: bg.textSec }} />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="px-4 py-4 mt-4 space-y-2" style={{ borderTop: `1px solid ${bg.panelBorder}` }}>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
            <Trash2 className="w-5 h-5 text-[#EF4444]" />
            <span className="text-[14px] text-[#EF4444]">Удалить чат</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors">
            <BellOff className="w-5 h-5 text-[#EF4444]" />
            <span className="text-[14px] text-[#EF4444]">Заблокировать</span>
          </button>
        </div>
      </div>
    </div>
  );
}