import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StickyContext from '../StickyContext';

class Sticky extends Component {
  state = {
    isSticky: false,
    wasSticky: false,
    style: {}
  };

  stickyRef = React.createRef();
  placeholderRef = React.createRef();

  static contextType = StickyContext;

  componentDidMount() {
    const { subscribe } = this.context;
    if (!subscribe) {
      throw new TypeError('Expected Sticky to be mounted within StickyContainer');
    }

    subscribe(this.handleContainerEvent);
  }

  componentWillUnmount() {
    const { unsubscribe } = this.context;

    unsubscribe(this.handleContainerEvent);
  }

  componentDidUpdate() {
    const { disableCompensation } = this.props;
    const { isSticky, calculatedHeight } = this.state;

    this.placeholderRef.current.style.paddingBottom = disableCompensation ? 0 : `${isSticky ? calculatedHeight : 0}px`;
  }

  handleContainerEvent = ({ distanceFromTop, distanceFromBottom, eventSource }) => {
    const { bottomOffset, topOffset, relative, disableHardwareAcceleration } = this.props;

    const parent = this.context.getParent();

    let preventingStickyStateChanges = false;
    if (relative) {
      preventingStickyStateChanges = eventSource !== parent;
      distanceFromTop = -(eventSource.scrollTop + eventSource.offsetTop) + this.placeholderRef.current.offsetTop;
    }

    const placeholderClientRect = this.placeholderRef.current.getBoundingClientRect();
    const contentClientRect = this.content.getBoundingClientRect();
    const calculatedHeight = contentClientRect.height;

    const bottomDifference = distanceFromBottom - bottomOffset - calculatedHeight;

    const wasSticky = !!this.state.isSticky;
    const isSticky = preventingStickyStateChanges
      ? wasSticky
      : distanceFromTop <= -topOffset && distanceFromBottom > -bottomOffset;

    distanceFromBottom = (relative ? parent.scrollHeight - parent.scrollTop : distanceFromBottom) - calculatedHeight;

    const style = !isSticky
      ? {}
      : {
          position: 'fixed',
          top:
            bottomDifference > 0 ? (relative ? parent.offsetTop - parent.offsetParent.scrollTop : 0) : bottomDifference,
          left: placeholderClientRect.left,
          width: placeholderClientRect.width
        };

    if (!disableHardwareAcceleration) {
      style.transform = 'translateZ(0)';
    }

    this.setState({
      isSticky,
      wasSticky,
      distanceFromTop,
      distanceFromBottom,
      calculatedHeight,
      style
    });
  };

  render() {
    const { isSticky, wasSticky, distanceFromTop, distanceFromBottom, calculatedHeight, style } = this.state;
    const { children } = this.props;

    const element = React.cloneElement(
      children({
        isSticky: isSticky,
        wasSticky: wasSticky,
        distanceFromTop: distanceFromTop,
        distanceFromBottom: distanceFromBottom,
        calculatedHeight: calculatedHeight,
        style: style
      }),
      {
        ref: content => {
          this.content = content;
        }
      }
    );

    return (
      <StickyContext.Consumer>
        {() => {
          return (
            <div ref={this.stickyRef}>
              <div ref={this.placeholderRef} />
              {element}
            </div>
          );
        }}
      </StickyContext.Consumer>
    );
  }
}

Sticky.propTypes = {
  bottomOffset: PropTypes.number,
  children: PropTypes.any,
  disableCompensation: PropTypes.bool,
  disableHardwareAcceleration: PropTypes.bool,
  relative: PropTypes.bool,
  topOffset: PropTypes.number
};

Sticky.defaultProps = {
  relative: false,
  topOffset: 0,
  bottomOffset: 0,
  disableCompensation: false,
  disableHardwareAcceleration: false
};

export default Sticky;
export { Sticky as MDBSticky };
