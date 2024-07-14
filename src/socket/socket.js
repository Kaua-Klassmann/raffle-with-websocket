const usuarios = [];

export default function (io) {
  io.on("connection", (socket) => {
    socket.on("setAdmin", ({ admin }) => {
      if (!admin) {
        usuarios.push(socket.id);
      }
    });

    socket.on("sortear", () => {
      const sorteado = usuarios[Math.floor(Math.random() * usuarios.length)];

      usuarios.forEach((usuario) => {
        if (usuario === sorteado) {
          io.to(usuario).emit("ganhou");
        } else {
          io.to(usuario).emit("perdeu");
        }
      });
    });

    socket.on("disconnect", () => {
      usuarios.splice(usuarios.indexOf(socket.id), 1);
    });
  });
}
