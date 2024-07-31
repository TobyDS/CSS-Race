import userOutlineBlue from '@images/user-outline-blue.svg';
import userOutlineGrey from '@images/user-outline-grey.svg';
import userOutlineRed from '@images/user-outline-red.svg';
import userSolidBlue from '@images/user-solid-blue.svg';
import userSolidRed from '@images/user-solid-red.svg';

export const userStatusUtils = {
  getSVG: function ({ playerNum, targetUserReady }) {
    let imgSrc = userOutlineGrey;
    let altText = 'user not connected';

    if (targetUserReady !== undefined) {
      if (playerNum === 1) {
        imgSrc = targetUserReady ? userSolidBlue : userOutlineBlue;
      } else {
        imgSrc = targetUserReady ? userSolidRed : userOutlineRed;
      }
      altText = `user ${targetUserReady ? 'ready' : 'not ready'}`;
    }

    return <img src={imgSrc} alt={altText} />;
  },
  getUserStatusText: function (targetUserReady) {
    switch (targetUserReady) {
    case false:
      return 'Not Ready';
    case true:
      return 'Ready';
    default:
      return 'Not Connected';
    }
  },
};
