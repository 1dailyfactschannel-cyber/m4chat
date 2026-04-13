import { create } from 'zustand';
import type { User, UserEditForm } from '../types/user';

interface UserState {
  currentUser: User;
  isEditing: boolean;
  isProfileOpen: boolean;
  editForm: UserEditForm;
  
  openProfile: () => void;
  closeProfile: () => void;
  startEditing: () => void;
  cancelEditing: () => void;
  saveProfile: (data: Partial<User>) => void;
  updateEditForm: (data: Partial<UserEditForm>) => void;
}

const DEFAULT_USER: User = {
  id: 0,
  name: 'John Doe',
  avatar: 'JD',
  color: 'from-blue-400 to-blue-600',
  status: 'в сети',
  statusColor: '#4DCA65',
  phone: '+1 (555) 012-3456',
  username: '@johndoe',
  bio: 'Software Engineer. Coffee addict.',
};

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: DEFAULT_USER,
  isEditing: false,
  isProfileOpen: false,
  editForm: {
    name: DEFAULT_USER.name,
    username: DEFAULT_USER.username || '',
    bio: DEFAULT_USER.bio || '',
    phone: DEFAULT_USER.phone || '',
  },

  openProfile: () => set({ isProfileOpen: true }),
  
  closeProfile: () => set({ 
    isProfileOpen: false,
    isEditing: false,
    editForm: {
      name: get().currentUser.name,
      username: get().currentUser.username || '',
      bio: get().currentUser.bio || '',
      phone: get().currentUser.phone || '',
    },
  }),

  startEditing: () => {
    const { currentUser } = get();
    set({
      isEditing: true,
      editForm: {
        name: currentUser.name,
        username: currentUser.username || '',
        bio: currentUser.bio || '',
        phone: currentUser.phone || '',
      },
    });
  },

  cancelEditing: () => set({ isEditing: false }),

  saveProfile: (data) => set((state) => ({
    currentUser: {
      ...state.currentUser,
      ...data,
      avatar: data.name ? data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : state.currentUser.avatar,
    },
    isEditing: false,
  })),

  updateEditForm: (data) => set((state) => ({
    editForm: { ...state.editForm, ...data },
  })),
}));