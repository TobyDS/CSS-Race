import userOutlineBlue from '@images/user-outline-blue.svg';
import userOutlineGrey from '@images/user-outline-grey.svg';
import userOutlineRed from '@images/user-outline-red.svg';
import userSolidBlue from '@images/user-solid-blue.svg';
import userSolidRed from '@images/user-solid-red.svg';

export const userStatusUtils = {
  getSVG: function ({ playerNum, isReady }) {
    let imgSrc = userOutlineGrey;
    let altText = 'user not connected';

    if (isReady !== undefined) {
      if (playerNum === 1) {
        imgSrc = isReady ? userSolidBlue : userOutlineBlue;
      } else {
        imgSrc = isReady ? userSolidRed : userOutlineRed;
      }
      altText = `user ${isReady ? 'ready' : 'not ready'}`;
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
