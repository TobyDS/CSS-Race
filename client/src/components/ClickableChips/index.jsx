import PropTypes from 'prop-types';
import { Avatar, Chip, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';

function ClickableChips ({ colors }) {
  const [tooltipText, setTooltipText] = useState({});
  const [open, setOpen] = useState({});

  async function handleClick (color) {
    try {
      await navigator.clipboard.writeText(color.slice(1)); // Remove the # from the color
      setTooltipText({ ...tooltipText, [color]: 'Copied' });
      handleTooltipOpen(color);
      setTimeout(
        () => setTooltipText({ ...tooltipText, [color]: 'Copy' }),
        2000
      ); // Reset tooltip text after 2 seconds
    } catch (err) {
      console.error('Failed to copy color: ', err);
    }
  }

  function handleTooltipClose (color) {
    setOpen({ ...open, [color]: false });
  }

  function handleTooltipOpen (color) {
    setOpen({ ...open, [color]: true });
  }

  return (
    <div>
      {colors.map((color) => (
        <Tooltip
          open={open[color]}
          onClose={() => handleTooltipClose(color)}
          onOpen={() => handleTooltipOpen(color)}
          title={tooltipText[color] || 'Copy'}
          key={color}
        >
          <Chip
            avatar={
              <Avatar sx={{ bgcolor: color }}>
                <ContentCopyIcon fontSize='small' />
              </Avatar>
            }
            label={color}
            onClick={() => handleClick(color)}
            style={{ margin: '0.5rem' }}
          />
        </Tooltip>
      ))}
    </div>
  );
}

ClickableChips.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ClickableChips;
