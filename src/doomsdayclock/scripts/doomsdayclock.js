export class DoomsDayClock extends Application {
  static ID = "foundry-color-window";
  static instance = null;
  color = "#ffffff"; // Standardfarbe

  constructor(options = {}) {
      super(options);
  }

  static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
          id: this.ID,
          title: "Farbfeld",
          template: "modules/doomsdayclock/templates/window.html",
          width: 300,
          height: 200,
          resizable: true
      });
  }

  activateListeners(html) {
      super.activateListeners(html);
      this.updateColor();
  }

  updateColor() {
      const innerDiv = document.getElementById("inner-div");
      if (innerDiv) {
          innerDiv.style.backgroundColor = this.color;
      }
  }

  static openForAll() {
      game.socket.emit('module.doomsdayclock', 'foo', 'bar', 'bat');      
  }

  static updateColorForAll(color) {
      game.socket.emit("module.foundry-color-window.color", { color });
  }


}

