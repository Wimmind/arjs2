export const setRedux = (state = {}) => {
  return (Object.assign({ type: 'redux' }, state))
};

export default {
  setRedux
}