module.exports = {
  PORT: 3000,
  ROUTES: {
    root: "/",
    newMessage: "/new",
  },
  messages: [
    { text: "Hi there", user: "Amando", added: new Date() },
    { text: "Hello World!", user: "Charles", added: new Date() },
  ],
};
