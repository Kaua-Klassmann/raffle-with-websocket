const socket = io("http://localhost:3000");
socket.emit("setAdmin", { admin: false });

socket.on("ganhou", () => {
  document.body.style.backgroundColor = "green";
});

socket.on("perdeu", () => {
  document.body.style.backgroundColor = "red";
});
