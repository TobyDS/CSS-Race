import { IconButton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PropTypes from 'prop-types';

function CopyClipboardButton ({ roomId }) {
  async function handleCopy () {
    try {
      await navigator.clipboard.writeText(roomId);
    } catch (err) {
      console.error('Failed to copy room ID: ', err);
    }
  }

  return (
    <>
      <Typography variant='h5' color='text.primary'>
        {roomId}
      </Typography>
      <IconButton aria-label='copy' color='primary' onClick={handleCopy}>
        <ContentCopyIcon />
      </IconButton>
    </>
  );
}

CopyClipboardButton.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default CopyClipboardButton;
