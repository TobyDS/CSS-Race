import PropTypes from 'prop-types';

import ClickableChips from '@components/ClickableChips';
import styles from '@components/RenderFrame/index.module.css';

function RenderImage ({ image }) {
  if (!image || !image.img) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.renderFrameContainer}>
        <div className={styles.flexRow}>
          <p>Target</p>
          <p>400px x 300px</p>
        </div>
        <img
          src={`data:image/jpeg;base64,${image.img}`}
          srcSet={`data:image/jpeg;base64,${image.img_2x} 2x`}
        />
      </div>
      <ClickableChips colors={image.colors} />
    </div>
  );
}

RenderImage.propTypes = {
  image: PropTypes.shape({
    img: PropTypes.string.isRequired,
    img_2x: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default RenderImage;
