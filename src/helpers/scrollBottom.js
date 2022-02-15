let getPosition = null;

export const getScrollPosition = () => {
  getPosition = window.pageYOffset;
  return getPosition;
};

export const scrollBottom = () => {
  window.scrollTo({
    top: getScrollPosition,
  });
};
