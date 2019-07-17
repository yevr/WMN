const uuid_v4 = require('uuid/v4');
const noteStorage = [ // Default data to enable easier testing since there's no persistent storage.
  {id: '530b37e8-5915-4753-9097-6040e179e45d', title: 'testNote1', text: 'Test Contents For Search'},
  {id: '530b37e8-5915-4753-9097-6040e179e46d', title: 'testNote2', text: 'Partial Foo Or FullText'},
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

  static getAsJson(note) {
    return {
      id: note.id,
      text: note.text,
      title: note.title,
    };
  }

  static async create(note) {
    const createdNote = new NoteModel(note);
    noteStorage.push(NoteModel.getAsJson(createdNote));
    return createdNote;
  }

  static async getAllNotes() { // These are async just for realism, nothing else. Most models are.
    return noteStorage;
  }

  static async findById(id) {
    return noteStorage.find(note => note.id === id) || null;
  }

  static async findByTitle(title) {
    return noteStorage.filter(note => note.title.includes(title)) || null;
  }

  static async findByText(text) {
    return noteStorage.filter(note => note.text.includes(text)) || null;
  }

  static async update(note) { // Array manipulation perf wizardry aside, let's delete/re-add for brevity.
    // Because of the questionable implementation, let's ensure our delete doesn't fail & we only create.
    if (await NoteModel.deleteById(note.id)) {
      await NoteModel.create(new NoteModel(note));
      return true;
    }
    return false;
  }

  static async deleteById(id) { // Avoid filters or fanciness here. Splice is extremely performant in V8.
    for(let i = 0; i < noteStorage.length; i++){
      if (noteStorage[i].id === id) {
        noteStorage.splice(i, 1);
        return true;
      }
    }
    return false;
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
