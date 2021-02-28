class MockDatabase {

  constructor() {
    this.index = 0;
    this.storage = [];
  }

  getAll() {
    return this.storage;
  }

  getOne(id) {
    return this.storage.find(record => record.id === id)
  }

  createOne(obj) {
    const newRecord = {
      id: this.index,
      data: obj
    }
    this.index += 1
    this.storage.push(newRecord);
    return newRecord;
  }

  updateOne(id, newObj) {
    let obj = this.storage.find(record => record.id === id);
    let index = this.storage.indexOf(obj);
    obj.data = newObj;
    this.storage.index = obj;
    return this.storage.index;
  }

  deleteOne(id) {
    let obj = this.storage.find(record => record.id === id);
    if (obj === undefined) {
      return null
    }
    let index = this.storage.indexOf(obj);
    this.storage.splice(index,1);
    return !this.storage.find(record => record.id === id) ? null : 'Please try again'
  }

}

module.exports = MockDatabase;
