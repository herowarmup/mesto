export default class Section {
  constructor({ items, renderer }, container) {
    this._renderer = renderer;
    this._items = items;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._container.prepend(this._renderer(item));
    });
  }

  prependItem(item) {
    this._container.prepend(this._renderer(item));
  }
}
