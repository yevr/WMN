const uuid_v4 = require('uuid/v4');
const noteStorage = [
  {id: '530b37e8-5915-4753-9097-6040e179e45d', title: 'testNote1', text: 'Test Contents For Search'},
  {id: '530b37e8-5915-4753-9097-6040e179e46d', title: 'testNote2', text: 'Partial Or FullText'},
  {id: '530b37e8-5915-4753-9097-6040e179e47d', title: 'testNote3', text: 'Foo Bar'},
]; // TODO use StorageFlatFile.

class NoteModel {
  #id;
  #title;
  #text;

  constructor(note) {
    this.id = note.id || uuid_v4();
    this.title = note.title || '';
    this.text = note.text || '';
  }

  static async create(note) {
    console.log('createTODO!');
  }

  static async getAllNotes() {
    return noteStorage;
  }

  // Normally we'd have findOne, findMany or findByTitle, findByText, etc - assume it's all just 'find' for brevity.
  static async find(note) {
    console.log('findTODO!');
  }

  static async update(note) {
    console.log('updateTODO!');
  }

  static async delete(note) {
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
