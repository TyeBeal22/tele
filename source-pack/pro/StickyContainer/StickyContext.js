import React from 'react';

const defaultValue = {
  subscribe: () => {},
  unsubscribe: () => {},
  getParent: () => {}
};

const StickyContainerContext = React.createContext(defaultValue);

export { StickyContainerContext as default };
