export const userStatusUtils = {
  getSVG: function ({ playerNum, isReady }) {
    let imgSrc = '/src/assets/images/user-outline-grey.svg';
    let altText = 'user not connected';

    if (isReady !== undefined) {
      const color = playerNum === 1 ? 'blue' : 'red';
      const type = isReady ? 'solid' : 'outline';
      imgSrc = `/src/assets/images/user-${type}-${color}.svg`;
      altText = `user ${type === 'solid' ? 'ready' : 'not ready'}`;
    }

    return <img src={imgSrc} alt={altText} />;
  },
  getUserStatusText: function (isReady) {
    switch (isReady) {
    case false:
      return 'Not Ready';
    case true:
      return 'Ready';
    default:
      return 'Not Connected';
    }
  },
};
