import React from 'react';
import PropTypes from 'prop-types';
function RenderImage ({ image }) {
  if (!image || !image.img) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={`data:image/jpeg;base64,${image.img}`} />
    </div>
  );
}

RenderImage.propTypes = {
  image: PropTypes.shape({
    img: PropTypes.string.isRequired,
  }),
};

export default RenderImage;
