import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';
import StickyContext from './StickyContext';

class Container extends PureComponent {
  state = {
    subscription: '',
    unsubscribion: '',
  };

  nodeRef = React.createRef();

  events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'];

  subscribers = [];

  subscribe = (handler) => {
    this.subscribers = this.subscribers.concat(handler);
  };

  unsubscribe = (handler) => {
    this.subscribers = this.subscribers.filter((current) => current !== handler);
  };

  notifySubscribers = (evt) => {
    if (!this.framePending) {
      const { currentTarget } = evt;

      raf(() => {
        this.framePending = false;
        const { top, bottom } = this.nodeRef.current.getBoundingClientRect();

        this.subscribers.forEach((handler) =>
          handler({
            distanceFromTop: top,
            distanceFromBottom: bottom,
            eventSource: currentTarget === window ? document.body : this.nodeRef.current,
          })
        );
      });
      this.framePending = true;
    }
  };

  getParent = () => {
    return this.nodeRef.current;
  };

  componentDidMount() {
    this.events.forEach((event) => window.addEventListener(event, this.notifySubscribers));
  }

  componentWillUnmount() {
    this.events.forEach((event) => window.removeEventListener(event, this.notifySubscribers));
  }

  render() {
    return (
      <StickyContext.Provider
        value={{ subscribe: this.subscribe, unsubscribe: this.unsubscribe, getParent: this.getParent }}
      >
        <div
          {...this.props}
          ref={this.nodeRef}
          onScroll={this.notifySubscribers}
          onTouchStart={this.notifySubscribers}
          onTouchMove={this.notifySubscribers}
          onTouchEnd={this.notifySubscribers}
        />
      </StickyContext.Provider>
    );
  }
}

export default Container;
export { Container as MDBStickyContent };
