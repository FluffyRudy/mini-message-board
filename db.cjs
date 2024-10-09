const messageDB = {
  messages: {},
  id: 1,
  prevID: 0,
  nextID: 2,
  addMessage: function (user, text) {
    if (!user || !text) {
      throw Error("Invlaid message body, require author and message");
    }
    this.messages[this.id] = {
      id: this.id,
      prevID: this.prevID,
      nextID: this.nextID,
      user: user,
      text: text,
      added: new Date(),
    };
    this.prevID = this.id || null;
    this.id++;
    this.nextID = this.id + 1;
  },
  getMessage: function (id) {
    return this.messages[id];
  },
};

module.exports = { messageDB };
