export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  prependItem(item) {
    this._container.prepend(item);
  }
}
