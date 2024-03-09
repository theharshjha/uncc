module.exports = class EventEmitter {
  constructor() {
    this._events = {};
    this._eventsCount = 0;
    this._maxListeners = undefined;
  }

  addListener(eventName, listener) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events[eventName].push(listener);
    return this;
  }

  emit(eventName, ...args) {
    if (this._events[eventName]) {
      for (let i = 0; i < this._events[eventName].length; i++) {
        this._events[eventName][i](...args);
      }
      return true;
    }
    return false;
  }

  eventNames() {
    const events = [];
    for (let event in this._events) {
      events.push(event);
    }
    return events;
  }

  getMaxListeners() {
    return this._maxListeners;
  }

  listenerCount(eventName, listener) {
    let count = 0;
    if (listener) {
      for (let cb of this._events[eventName]) {
        if (cb === listener) {
          count++;
        }
      }
    } else {
      count = this._events[eventName].length;
    }
    return count;
  }

  listeners(eventName) {
    return [...this._events[eventName]];
  }

  off(eventName, listener) {
    return this.removeListener(eventName, listener);
  }

  on(eventName, listener) {
    return this.addListener(eventName, listener);
  }

  removeAllListeners(eventName) {
    if (eventName) {
      delete this._events[eventName];
    } else {
      for (let event in this._events) {
        delete this._events[event];
      }
    }
    return this;
  }

  removeListener(eventName, listener) {
    for (let i = 0; i < this._events[eventName].length; i++) {
      if (this._events[eventName][i] === listener) {
        this._events[eventName].splice(i, 1);
        break;
      }
    }
    return this;
  }
}
