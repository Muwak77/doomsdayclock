import { ClockWindow } from "./clockwindow.js";
import { DoomsDayClock } from "./doomsdayclock.js";

// **Sockets registrieren**
Hooks.once("ready", () => {
  game.ClockWindow =ClockWindow.instance;
  if (game.chatCommands) {
    game.chatCommands.register({
      commandKey: "/ddc",
      invokeOnCommand: (chatlog, messageText, chatdata) => {
        DoomsDayClock.socket.executeForEveryone ("open");
      },
      shouldDisplayToChat: false,
      description: "Öffnet die Doomsday Clock für alle Spieler.",
      gmOnly: false,
    });

    game.chatCommands.register({
      commandKey: "/ddctick",
      invokeOnCommand: (chatlog, messageText, chatdata) => {
        DoomsDayClock.socket.executeForEveryone ("settime","--:--");
      },
      shouldDisplayToChat: false,
      description: "Öffnet die Doomsday Clock lokal.",
      gmOnly:true,
    });
  }

    DoomsDayClock.socket = socketlib.registerModule("doomsdayclock");
    DoomsDayClock.socket.register("open", () => game.ClockWindow.openWindow());  
    DoomsDayClock.socket.register("settime", (time) => {
      game.ClockWindow.setTime(time);
  });    


    //Makro zum Verfolgen der Uhr. Es erfordert "Simple Calendar" und gibt zu den richtigen Zeiten eine Nachricht, welches Portal sich öffnet und was die Uhr gerade anzeigt
let lastTrigger = "00:00";

Hooks.on(SimpleCalendar.Hooks.DateTimeChange, async (data) => { 
    let inputTime = `${data.date.hour}:${data.date.minute}`;
    

    if (inputTime !== lastTrigger) {
        lastTrigger = inputTime;

        const timeData = [
            { time: "1:51", number: 1, description: "Spiegellabyrinth", world: "Spiegelwelt" },
            { time: "3:42", number: 2, description: null, world: null },
            { time: "5:33", number: 3, description: null, world: null },
            { time: "7:24", number: 4, description: null, world: null },
            { time: "9:14", number: 5, description: null, world: null },
            { time: "11:50", number: 6, description: null, world: null },
            { time: "12:56", number: 7, description: null, world: null },
            { time: "14:47", number: 8, description: null, world: null },
            { time: "16:37", number: 9, description: null, world: null },
            { time: "18:28", number: 10, description: null, world: null },
            { time: "20:19", number: 11, description: null, world: null },
            { time: "22:10", number: 12, description: null, world: null },
            { time: "24:00", number: 13, description: null, world: null }
        ];

        // Vergleiche die Eingabezeit mit den Zeiten im Array
        const matchingObject = timeData.find(item => item.time === inputTime);        
        
        // Wenn ein passendes Objekt gefunden wurde, gebe eine Nachricht aus
        if (matchingObject) {
            ui.notifications.info(matchingObject.time +"(" + matchingObject.number+","+matchingObject.description+")" , { permanent: true });

            DoomsDayClock.socket.executeForEveryone("settime", matchingObject.number);
            console.log(`Die passende Zeit wurde gefunden: ${JSON.stringify(matchingObject)}`);

            const playlistName = "To whom the Bell tolls"; // ÄNDERE DIES AUF DEN RICHTIGEN NAMEN!
            const soundName = "BELL";             
            
            let playlist = game.playlists.contents.find(p => p.name === playlistName);

            if (playlist) {
                let sound = playlist.sounds.find(s => s.name === soundName);
                if (sound) {                    
                    await playlist.playSound(sound); // Sound abspielen
                } else {
                    ui.notifications.error(`Sound '${soundName}' nicht gefunden!`);
                }
            } else {
                ui.notifications.error(`Playlist '${playlistName}' nicht gefunden!`);
            }
        } else {
            console.log("Keine passende Zeit gefunden.");
        }
    }
});

});

