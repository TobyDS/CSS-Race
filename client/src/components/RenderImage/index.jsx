import PropTypes from 'prop-types';

import ClickableChips from '@components/ClickableChips';
import renderStyles from '../RenderFrame/index.module.css';
import styles from './index.module.css';

function RenderImage ({ image }) {
  if (!image || !image.img) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.flexContainer}>
      <div className={renderStyles.renderFrameContainer}>
        <div className={renderStyles.flexRow}>
          <p>Target</p>
          <p>400px x 300px</p>
        </div>
        <img src={`data:image/jpeg;base64,${image.img}`} />
      </div>
      <ClickableChips colors={image.colors} />
    </div>
  );
}

RenderImage.propTypes = {
  image: PropTypes.shape({
    img: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default RenderImage;
