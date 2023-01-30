import { create } from 'zustand';

type CommentingState = {
  isCommenting: boolean;
  handleIsCommenting: () => void;
};

export const useCommentingStore = create<CommentingState>((set) => ({
  isCommenting: false,
  handleIsCommenting: () => {
    set((state) => ({ isCommenting: !state.isCommenting }));
  },
}));
