export class ClockWindow extends Application {
    static _instance = null; // Statische Eigenschaft für die Instanz

    constructor(options = {}) {
        super(options);
    }
    lastTrigger = "00:00";
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "simple-window",
            template: `modules/doomsdayclock/templates/clockWindow.html`,
            width: 300,
            height: 320,
            classes: ["clockwindow"],
            title: "",
            resizable: false,
            movable: true,
            closable: false,
            minimizable: true
        });
    }

    // Methode, um auf die Instanz zuzugreifen
    static get instance() {
        if (!ClockWindow._instance) {
            ClockWindow._instance = new ClockWindow(); // Erstelle die Instanz nur einmal
        }
        return ClockWindow._instance;
    }

    async setTime(currentHour, currentMinute) {
        // Implementiere hier die Logik zur Zeitänderung
        let currentTime = `${currentHour}:${currentMinute}`;



        const timeData = [
            { time: "0:00", number: 0, description: "Der Ewige Jahrmarkt", world: "Der Ewige Jahrmarkt" },
            { time: "1:51", number: 1, description: "Das Stille Nichts", world: "Das Stille Nichts" },
            { time: "3:42", number: 2, description: "Das Uhrwerk-Reich", world: "Das Uhrwerk-Reich" },
            { time: "5:33", number: 3, description: "Die Albtraumstadt", world: "Die Albtraumstadt" },
            { time: "7:24", number: 4, description: "Die Fleischgrube", world: "Die Fleischgrube" },
            { time: "9:14", number: 5, description: "Das Gebrochene Himmelszelt", world: "Das Gebrochene Himmelszelt" },
            { time: "11:50", number: 6, description: "Die Versunkene Welt", world: "Die Versunkene Welt" },
            { time: "12:56", number: 7, description: "Der Staubhort", world: "Der Staubhort" },
            { time: "14:47", number: 8, description: "Die Ewige Dämmerung", world: "Die Ewige Dämmerung" },
            { time: "16:37", number: 9, description: "Die Knochenwüste", world: "Die Knochenwüste" },
            { time: "18:28", number: 10, description: "Der Karneval der Haut", world: "Der Karneval der Haut" },
            { time: "20:19", number: 11, description: "Die Schlafende Stadt", world: "Die Schlafende Stadt" },
            { time: "22:10", number: 12, description: "Spiegelwelt", world: "Spiegelwelt" }
        ];

        // Suche nach der letzten überschrittenen Zeitmarke
        let lastTimeObject = timeData.reverse().find(item => {
            let [hour, minute] = item.time.split(":").map(Number);
            return (currentHour > hour) || (currentHour === hour && currentMinute >= minute);
        });

        if (lastTimeObject && lastTimeObject.time !== this.lastTrigger) {
            this.lastTrigger = lastTimeObject.time;

            if (game.user.isGM) {
                ui.notifications.info(`${lastTimeObject.time} (${lastTimeObject.description})`, { timeout: 10000 });

                console.log(`Die passende Zeit wurde gefunden: ${JSON.stringify(lastTimeObject)}`);
                const playlistName = "To whom the Bell tolls";
                const soundName = "BELL";

                /*
                if (playlist) {
                    let sound = playlist.sounds.find(s => s.name === soundName);
                    if (sound) {
                        await playlist.playSound(sound);
                    } else {
                        ui.notifications.error(`Sound '${soundName}' nicht gefunden!`);
                    }
                } else {
                    ui.notifications.error(`Playlist '${playlistName}' nicht gefunden!`);
                }
                    */
            }
            const element = this.element.find(".doomsdayclock_hand")[0];

            if (element) {
                let base = 360 / 13;
                let pos = lastTimeObject.number;

                element.style.transform = `rotate(${pos * base}deg)`; // Beispielrotation basierend auf Zeit
            }

        }

    }

    getData() {
        return { text: this._text };
    }

    // Öffnet das Fenster
    async openWindow() {

        await this.render(true); // Verwendet die Singleton-Instanz
        this.lastTrigger = "00:00";
        setTimeout(() => {
            this.setTime(SimpleCalendar.api.currentDateTime().hour, SimpleCalendar.api.currentDateTime().minute);
        }, 100);

    }
}
