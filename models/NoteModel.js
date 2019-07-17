const uuid_v4 = require('uuid/v4');
const noteStorage = {}; // TODO use StorageFlatFile.

class NoteModel {
  #id;
  #title;
  #text;

  constructor(note) {
    this.id = note.id || uuid_v4();
    this.title = note.title || '';
    this.text = note.text || '';
  }

  static create(note) {
    console.log('createTODO!');
  }

  static get(note) {
    console.log('getTODO!');
  }

  static find(note) {
    console.log('findTODO!');
  }

  static update(note) {
    console.log('updateTODO!');
  }

  static delete(note) {
    console.log('deleteTODO!');
  }

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
