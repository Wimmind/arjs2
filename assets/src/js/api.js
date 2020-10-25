import localforage from "localforage";
import REDUX from "./redux";
import { connect } from "react-redux";

const { floor, random } = Math;

export const ROUTES = {
  Main: { path: "/" },
  Desktop: { path: "/desktop" },
  Mobile: { path: "/mobile" },
};

export const dispatchEvent = (type, data = {}, element) => {
  var event = new CustomEvent(type, {
    detail: data
  });
  element ? element.dispatchEvent(event) : document.dispatchEvent(event);
};

export const API = {
  connect: (component_, vars = []) => {
    const dispatchState = (state) => {
      let _state = {};

      if (vars.length) {
        //only vars props
        vars.forEach(name => {
          _state[name] = state[name];
        })
      }
      else {
        //all props
        Object.keys(state).forEach((key) => {
          if (key !== "type") {
            _state[key] = state[key];
          }
        });
      }

      return _state;
    };

    return connect(dispatchState, dispatch => ({
      setRedux: state => dispatch(REDUX.actions.setRedux(state)),
    }))(component_);
  },
  dispatchEvent,
  randomInt: (min = 0, max = 1) => (floor(random() * (max - min + 1)) + min),
  setClasses: (defaultClasses = false, isActiveClasses = false) => {
    //defaultClasses = ['className']
    //isActiveClasses = { className: 'condition' }
    let classNames = [],
      className = "";

    //handling defaultClasses
    if (defaultClasses) {
      classNames = defaultClasses;
    }

    //handling active classes
    if (isActiveClasses) {
      classNames.push(
        ...Object.keys(isActiveClasses)
          .map((className) => isActiveClasses[className] && className)
          .filter((className) => className)
      );
    }

    //joining classes
    className = classNames.join(" ");

    return className;
  },
  store: {
    get: localforage.getItem,
    gets: async (arr) => {
      return new Promise((resolve) => {
        let result = {};
        Promise.all(
          arr.map(async (name) => {
            let value = await localforage.getItem(name);
            result[name] = value;
            return;
          })
        ).then(() => {
          resolve(result);
        });
      });
    },
    set: localforage.setItem,
    sets: async (arrObj) => {
      await Promise.all(
        Object.keys(arrObj).map((name) =>
          localforage.setItem(name, arrObj[name])
        )
      );
      return arrObj;
    },
    remove: localforage.removeItem,
    removes: (arr) =>
      Promise.all(arr.map(async (name) => localforage.removeItem(name))),
    clear: localforage.clear,
  },
};

export default API;