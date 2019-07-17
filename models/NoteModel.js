const uuid_v4 = require('uuid/v4');

class NoteModel {
  #id = uuid_v4();
  #title = '';
  #text = '';

  constructor(note) {
    if (!NoteModel.verifyNote(note)) {
      throw new Error('Invalid schema!');
    }
    this.id = note.id;
    this.title = note.title;
    this.text = note.text;
  }

  static verifyNote = (note) => {
    return note.title && note.text;
  };

  set id(id) {
    this.#id = id;
  }

  get id() {
    return this.#id;
  }

  set title(title) {
    this.#title = title;
  }

  get title() {
    return this.#title;
  }

  set text(text) {
    this.#text = text;
  }

  get text() {
    return this.#text;
  }
}
module.exports = NoteModel;
