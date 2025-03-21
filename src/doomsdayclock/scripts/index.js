import { ClockWindow } from "./clockwindow.js";
import { DoomsDayClock } from "./doomsdayclock.js";

// **Sockets registrieren**
Hooks.once("ready", () => {
  game.ClockWindow = ClockWindow.instance;
  game.DoomsDayClock=DoomsDayClock;
  if (game.chatCommands) {
    game.chatCommands.register({
      commandKey: "/ddc",
      invokeOnCommand: (chatlog, messageText, chatdata) => {
        DoomsDayClock.socket.executeForEveryone("open");
      },
      shouldDisplayToChat: false,
      description: "Öffnet die Doomsday Clock für alle Spieler.",
      gmOnly: false,
    });

    game.chatCommands.register({
      commandKey: "/ddctick",
      invokeOnCommand: (chatlog, messageText, chatdata) => {
        DoomsDayClock.socket.executeForEveryone("settime", "--:--");
      },
      shouldDisplayToChat: false,
      description: "Öffnet die Doomsday Clock lokal.",
      gmOnly: true,
    });
  }

  DoomsDayClock.socket = socketlib.registerModule("doomsdayclock");
  DoomsDayClock.socket.register("open", () => game.ClockWindow.openWindow());
  DoomsDayClock.socket.register("settime", (currentHour,currentMinute) => {
    game.ClockWindow.setTime(currentHour,currentMinute);
  });


  //Makro zum Verfolgen der Uhr. Es erfordert "Simple Calendar" und gibt zu den richtigen Zeiten eine Nachricht, welches Portal sich öffnet und was die Uhr gerade anzeigt
  

  Hooks.on(SimpleCalendar.Hooks.DateTimeChange, async (data) => {

    let currentHour = data.date.hour;
    let currentMinute = data.date.minute;
    DoomsDayClock.socket.executeForEveryone("settime",currentHour,currentMinute);
  });


});

