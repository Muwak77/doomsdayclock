export class ClockWindow extends Application {
    static _instance = null; // Statische Eigenschaft für die Instanz

    constructor(options = {}) {
        super(options);
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "simple-window",            
            template: `modules/doomsdayclock/templates/clockWindow.html`,
            width: 300,
            height: 200,                        
            title: "",  
            resizable: false,
            movable: true,   
            closable: false, 
            minimizable: false
        });
    }

    // Methode, um auf die Instanz zuzugreifen
    static get instance() {
        if (!ClockWindow._instance) {
            ClockWindow._instance = new ClockWindow(); // Erstelle die Instanz nur einmal
        }
        return ClockWindow._instance;
    }

    setTime(time) {
        // Implementiere hier die Logik zur Zeitänderung
        this._text=time;
        this.render(true);
    }

    getData() {        
        return { text: this._text };
    }

    // Öffnet das Fenster
    openWindow() {
        this.render(true); // Verwendet die Singleton-Instanz
    }
}
