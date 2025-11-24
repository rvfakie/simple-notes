import type { Note } from '~/network/codecs';
import { notes as mockNotes } from '~/network/mock';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notesData: [] as Note[],
  }),

  getters: {
    notes: state => state.notesData,
  },

  actions: {
    restore() {
      const notesCookie = useCookie<Note[] | null>('notes');

      if (notesCookie.value) {
        this.notesData = JSON.parse(JSON.stringify(notesCookie.value));
      } else {
        this.notesData = [];
      }
    },

    save() {
      const notesCookie = useCookie<Note[] | null>('notes', {
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
      });

      notesCookie.value = this.notesData;
    },

    remove(id: string) {
      this.notesData = this.notesData.filter(i => i.id !== id);

      this.save();
    },

    add(note: Note) {
      this.notesData.push(note);
    },

    generate() {
      this.notesData = mockNotes;

      this.save();
    },

    getNote(id: string) {
      return this.notesData.find(note => note.id === id);
    },
  },
});
