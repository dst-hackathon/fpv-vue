import fabric from 'fabric';

export default fabric.util.createClass(fabric.Canvas, {
  initialize(...args) {
    this.callSuper('initialize', ...args);

    this.on('selection:created', this.onSelectionCreated);
  },

  onSelectionCreated({ target: group }) {
    group.on('modified', () => {
      group.forEachObject(object => object.fire('modified'));
    });
  }
});
