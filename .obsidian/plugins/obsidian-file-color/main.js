/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/FileColorPlugin.ts
var import_obsidian3 = require("obsidian");

// src/SetColorModal.ts
var import_obsidian = require("obsidian");
var SetColorModal = class extends import_obsidian.Modal {
  constructor(plugin, filePath) {
    var _a;
    super(plugin.app);
    this.plugin = plugin;
    this.filePath = filePath;
    this.selectedColor = (_a = plugin.settings.fileColors.find((file) => file.path === filePath)) == null ? void 0 : _a.color;
  }
  async onSave() {
    const fileIndex = this.plugin.settings.fileColors.findIndex((file2) => file2.path === this.filePath);
    const file = fileIndex > -1 ? this.plugin.settings.fileColors[fileIndex] : void 0;
    if (!this.selectedColor) {
      if (file) {
        this.plugin.settings.fileColors.splice(fileIndex, 1);
        this.plugin.saveSettings();
        this.plugin.applyColorStyles();
        this.close();
      }
      return;
    }
    if (file) {
      file.color = this.selectedColor;
      this.plugin.saveSettings();
      this.plugin.applyColorStyles();
      this.close();
      return;
    }
    this.plugin.settings.fileColors.push({
      path: this.filePath,
      color: this.selectedColor
    });
    this.plugin.saveSettings();
    this.plugin.applyColorStyles();
    this.close();
  }
  createColorElement(parent, color, colorName) {
    const colorEl = parent.createEl("div");
    const colorCircleEl = colorEl.createEl("div");
    const colorNameEl = colorEl.createEl("small");
    colorCircleEl.addClass("file-color-modal-color-circle", `file-color-color-${color || "none"}`);
    colorNameEl.addClass("file-color-modal-color-name");
    colorNameEl.innerText = colorName;
    colorEl.addClass("file-color-modal-color");
    if (this.selectedColor === color) {
      colorEl.addClass("selected");
    }
    const handleSelectColor = () => {
      var _a;
      (_a = parent.querySelector(".selected")) == null ? void 0 : _a.removeClass("selected");
      this.selectedColor = color;
      this.onSave();
    };
    this.plugin.registerDomEvent(colorEl, "click", handleSelectColor.bind(this));
  }
  onOpen() {
    this.titleEl.innerText = "Set color";
    this.modalEl.addClass("file-color-modal");
    const colorPicker = this.contentEl.createDiv({
      cls: "file-color-modal-colors"
    });
    this.createColorElement(colorPicker, void 0, "None");
    for (const color of this.plugin.settings.palette) {
      this.createColorElement(colorPicker, color.id, color.name);
    }
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};

// node_modules/nanoid/index.browser.js
var nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");

// src/FileColorSettingTab.ts
var import_obsidian2 = require("obsidian");
var FileColorSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    var _a;
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("file-color-settings-panel");
    containerEl.createEl("h2", { text: "Palette" });
    if (this.plugin.settings.palette.length < 1) {
      containerEl.createEl("span").setText("No colors in the palette");
    }
    for (let colorIndex = 0; colorIndex < this.plugin.settings.palette.length; colorIndex++) {
      const color = this.plugin.settings.palette[colorIndex];
      const setting = new import_obsidian2.Setting(containerEl).addColorPicker((colorValue) => colorValue.setValue(color.value).onChange(async (value) => {
        color.value = value;
        this.plugin.saveSettings();
        this.plugin.generateColorStyles();
        this.plugin.applyColorStyles();
      })).addText((text) => text.setValue(color.name).setPlaceholder("Color name").onChange(async (value) => {
        color.name = value;
        this.plugin.saveSettings();
      })).addButton((removeButton) => {
        removeButton.onClick(async () => {
          this.plugin.settings.palette.splice(colorIndex, 1);
          this.plugin.settings.fileColors = this.plugin.settings.fileColors.filter((fileColor) => fileColor.color !== color.id);
          this.display();
          this.plugin.saveSettings();
          this.plugin.generateColorStyles();
          this.plugin.applyColorStyles();
        });
        removeButton.setIcon("trash-2");
      });
      (_a = setting.controlEl.parentElement) == null ? void 0 : _a.addClass("file-color-color-setting");
    }
    new import_obsidian2.Setting(containerEl).addButton((addButton) => {
      addButton.onClick(async () => {
        this.plugin.settings.palette.push({
          id: nanoid(),
          name: "",
          value: "#ffffff"
        });
        this.display();
        this.plugin.saveSettings();
        this.plugin.generateColorStyles();
        this.plugin.applyColorStyles();
      });
      addButton.setIcon("plus-circle");
    });
  }
};

// src/settings.ts
var defaultSettings = {
  palette: [],
  fileColors: []
};

// src/FileColorPlugin.ts
var FileColorPlugin = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.saveSettingsInternalDebounced = (0, import_obsidian3.debounce)(this.saveSettingsInternal, 3e3, true);
    this.applyColorStyles = (0, import_obsidian3.debounce)(this.applyColorStylesInternal, 50, true);
  }
  async onload() {
    await this.loadSettings();
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
      const addFileColorMenuItem = (item) => {
        item.setTitle("Set color");
        item.setIcon("palette");
        item.onClick(() => {
          new SetColorModal(this, file.path).open();
        });
      };
      menu.addItem(addFileColorMenuItem);
    }));
    this.app.workspace.onLayoutReady(async () => {
      this.generateColorStyles();
      this.applyColorStyles();
    });
    this.registerEvent(this.app.workspace.on("layout-change", () => this.applyColorStyles()));
    this.registerEvent(this.app.vault.on("rename", async (newFile, oldPath) => {
      this.settings.fileColors.filter((fileColor) => fileColor.path === oldPath).forEach((fileColor) => {
        fileColor.path = newFile.path;
      });
      this.saveSettings();
      this.applyColorStyles();
    }));
    this.registerEvent(this.app.vault.on("delete", async (file) => {
      this.settings.fileColors = this.settings.fileColors.filter((fileColor) => !fileColor.path.startsWith(file.path));
      this.saveSettings();
    }));
    this.addSettingTab(new FileColorSettingTab(this.app, this));
  }
  onunload() {
    const colorStyleEl = this.app.workspace.containerEl.querySelector("#fileColorPluginStyles");
    if (colorStyleEl) {
      colorStyleEl.remove();
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, defaultSettings, await this.loadData());
  }
  async saveSettings(immediate) {
    if (immediate) {
      return this.saveSettingsInternal();
    }
    return this.saveSettingsInternalDebounced();
  }
  saveSettingsInternal() {
    return this.saveData(this.settings);
  }
  generateColorStyles() {
    let colorStyleEl = this.app.workspace.containerEl.querySelector("#fileColorPluginStyles");
    if (!colorStyleEl) {
      colorStyleEl = this.app.workspace.containerEl.createEl("style");
      colorStyleEl.id = "fileColorPluginStyles";
    }
    colorStyleEl.innerHTML = this.settings.palette.map((color) => `.file-color-color-${color.id} { --file-color-color: ${color.value}; }`).join("\n");
  }
  applyColorStylesInternal() {
    const fileExplorers = this.app.workspace.getLeavesOfType("file-explorer");
    fileExplorers.forEach((fileExplorer) => {
      Object.entries(fileExplorer.view.fileItems).forEach(([path, fileItem]) => {
        const itemClasses = fileItem.titleEl.classList.value.split(" ").filter((cls) => !cls.startsWith("file-color"));
        const file = this.settings.fileColors.find((file2) => file2.path === path);
        if (file) {
          itemClasses.push("file-color-file");
          itemClasses.push("file-color-color-" + file.color);
        }
        fileItem.titleEl.classList.value = itemClasses.join(" ");
      });
    });
  }
};

// src/index.ts
var src_default = FileColorPlugin;
