const usuarios = [];

export default function (io) {
  io.on("connection", (socket) => {
    socket.on("setAdmin", ({ admin }) => {
      if (!admin) {
        usuarios.push(socket.id);
      }
    });

    socket.on("sortear", () => {
      const index = Math.floor(Math.random() * usuarios.length);
      const sorteado = usuarios[index];

      usuarios.map((usuario) => {
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
