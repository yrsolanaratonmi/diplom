import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext, createSelector} from "@ngxs/store";

export interface Note {
  id: number,
  title: string,
  description: string,
  file?: any,
  fileData?: File | null,
  created: Date
}

export class AddNote {
  static readonly type = '[Notes] AddNote'
  constructor(public note: Note) {}
}

export class RemoveNote {
  static readonly type = '[Notes] RemoveNote'
  constructor(public noteId: number) {}
}

export class EditNote {
  static readonly type = '[Notes] EditNote'
  constructor (public note: Note) {}
}

@State<Array<Note>>({
  name: 'notes',
  defaults: []
})
@Injectable()
export class NotesState {

  @Action(AddNote)
  addNote (ctx: StateContext<Array<Note>>, action: AddNote) {
    const notes = ctx.getState()
    const newState = [...notes, action.note]
    ctx.setState(newState)
  }

  @Action(RemoveNote)
  removeNote (ctx: StateContext<Array<Note>>, action: RemoveNote) {
    const notes = ctx.getState()
    const updatedNotes = notes.filter((note: Note) => note.id !== action.noteId);
    ctx.setState(updatedNotes)
  }

  @Action(EditNote)
  editNote (ctx: StateContext<Array<Note>>, action: EditNote) {
    const notes = ctx.getState()
    const updatedNotes = notes.map((note: Note) =>
      note.id == action.note.id ? action.note : note
    );
    ctx.setState(updatedNotes)
  }
}
