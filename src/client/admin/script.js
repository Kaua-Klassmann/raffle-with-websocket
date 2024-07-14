const button = document.querySelector("button");

const socket = io("http://localhost:3000");
socket.emit("setAdmin", { admin: true });

button.addEventListener("click", () => {
  socket.emit("sortear");
});
