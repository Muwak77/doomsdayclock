import { DoomsDayClock } from './doomsdayclock.js';

// **Sockets registrieren**
Hooks.once("ready", () => {
  game.socket.on("module.doomsdayclock.open", () => {
    if (!DoomsDayClock.instance) {
      DoomsDayClock.instance = new DoomsDayClock();
    }
    DoomsDayClock.instance.render(true);
  });

  game.socket.on("module.doomsdayclock", (data) => {
    console.log("SOCKET MESSAGE");
    if (DoomsDayClock.instance) {
      DoomsDayClock.instance.color = data.color;
      DoomsDayClock.instance.updateColor();
    }
  });


  if (game.chatCommands) {
    game.chatCommands.register({
      commandKey: "/ddc",
      invokeOnCommand: (chatlog, messageText, chatdata) => {
        DoomsDayClock.openForAll();
      },
      shouldDisplayToChat: false,
      description: "Sagt Hallo zu einem angegebenen Namen.",
      gmOnly: false
    });
  }
});


