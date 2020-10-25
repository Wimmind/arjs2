import actions from './actions';
import reducers from './reducers';
import initialState from './initialState';

export const Actions = actions;
export const Reducers = reducers;
export const InitialState = initialState;

export const REDUX = {
  actions,
  reducers,
  initialState
};

export default REDUX;