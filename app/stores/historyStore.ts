type HistoryAction =
  | 'renameNote'
  | 'renameTodo'
  | 'addTodo'
  | 'deleteTodo'
  | 'toggleTodo';

interface HistoryEntry {
  action: HistoryAction;
  undo: () => void;
  redo: () => void;
}

export const useHistoryStore = defineStore('history', {
  state: () => ({
    undoStack: [] as HistoryEntry[],
    redoStack: [] as HistoryEntry[],
  }),

  getters: {
    canUndo: state => state.undoStack.length > 0,
    canRedo: state => state.redoStack.length > 0,
  },

  actions: {
    clearHistory() {
      this.redoStack = [];
      this.undoStack = [];
    },

    clearRedoStack() {
      this.redoStack = [];
    },

    pushAction(entry: HistoryEntry) {
      this.undoStack.push(entry);
      this.clearRedoStack();
    },

    undo() {
      if (!this.canUndo) {
        return;
      }

      const entry = this.undoStack.pop();

      if (entry) {
        entry.undo();
        this.redoStack.push(entry);
      }
    },

    redo() {
      if (!this.canRedo) {
        return;
      }

      const entry = this.redoStack.pop();

      if (entry) {
        entry.redo();
        this.undoStack.push(entry);
      }
    },
  },
});
