import fabric from 'fabric';
import store from 'store';
import { SELECT_DESK, DESELECT_DESK } from 'store/floor-management/types';
import { UPDATE_DESK } from 'store/types';

const defaultOptions = {
  fill: 'green',
  opacity: 0.2
};

export default fabric.util.createClass(fabric.Rect, {

  initialize(options) {
    this.callSuper('initialize', {
      ...defaultOptions,
      ...options
    });

    // this.on('modified', () => {
    //   store.dispatch(UPDATE_DESK, {
    //     desk: this.toEntity()
    //   });
    // });
  },

  setAbsolutePosition(position) {
    if (this.group) {
      const groupOriginLeft = (-this.group.width / 2);
      const groupOriginTop = (-this.group.height / 2);

      this.set({
        left: (position.left - this.group.left) + groupOriginLeft,
        top: (position.top - this.group.top) + groupOriginTop
      });
    } else {
      this.set({
        ...position
      });
    }

    this.setCoords();
  },

  getAbsolutePosition() {
    let absPosition;

    if (this.group) {
      const groupOriginLeft = -(this.group.width / 2);
      const groupOriginTop = -(this.group.height / 2);

      absPosition = {
        left: this.group.left + (this.left - groupOriginLeft),
        top: this.group.top + (this.top - groupOriginTop)
      };

      // console.debug('group (left, top) = ', { l: this.group.left, t: this.group.top })
      // console.debug('group (w, h) = ', { w: this.group.width, h: this.group.height })
      // console.debug('group origin point (left, top) = ', { left: groupOriginLeft, top: groupOriginTop })
      // console.debug('this (left, top) = ', { left: this.left, top: this.top })
      // console.debug('abs (left, top) = ', absPosition)
    } else {
      absPosition = {
        left: this.left,
        top: this.top
      };
    }

    return absPosition;
  },

  toEntity() {
    const absolutePosition = this.getAbsolutePosition();

    return {
      id: this.id,
      x: absolutePosition.left,
      y: absolutePosition.top,

      // getWidth() !== this.width, same as height? bug?
      width: this.getWidth() - this.strokeWidth,
      height: this.getHeight() - this.strokeWidth
    };
  }
});
