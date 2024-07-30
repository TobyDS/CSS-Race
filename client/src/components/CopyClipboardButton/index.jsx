import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

function CopyClipboardButton ({ roomId }) {
  const [tooltipText, setTooltipText] = useState('Copy');
  const [open, setOpen] = useState(false);

  async function handleCopy () {
    try {
      await navigator.clipboard.writeText(roomId);
      setTooltipText('Copied');
      handleTooltipOpen();
      setTimeout(() => setTooltipText('Copy'), 2000); // Reset tooltip text after 2 seconds
    } catch (err) {
      console.error('Failed to copy room ID: ', err);
    }
  }

  function handleTooltipClose () {
    setOpen(false);
  }

  function handleTooltipOpen () {
    setOpen(true);
  }

  return (
    <>
      <Typography variant='h5' color='text.primary'>
        Room ID:
      </Typography>
      <Typography variant='h5' color='text.primary'>
        {roomId}
      </Typography>
      <Tooltip
        open={open}
        onClose={handleTooltipClose}
        onOpen={handleTooltipOpen}
        title={tooltipText}
        placement='top'
      >
        <IconButton aria-label='copy' color='primary' onClick={handleCopy}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

CopyClipboardButton.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default CopyClipboardButton;
