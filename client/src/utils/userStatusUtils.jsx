export const userStatusUtils = {
  getSVG: function ({ isHost, isReady }) {
    let imgSrc = '/src/assets/images/user-outline-grey.svg';
    let altText = 'user outline';

    if (isReady !== undefined) {
      const color = isHost ? 'blue' : 'red';
      const type = isReady ? 'solid' : 'outline';
      imgSrc = `/src/assets/images/user-${type}-${color}.svg`;
      altText = `user ${type}`;
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
