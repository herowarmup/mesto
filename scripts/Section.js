export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._rendererItems = items;
    this._container = containerSelector;
  }

  renderItems() {
    this._rendererItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}
