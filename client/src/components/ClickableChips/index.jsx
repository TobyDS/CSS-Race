import PropTypes from 'prop-types';
import { Avatar, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function ClickableChips ({ colors }) {
  async function handleClick (color) {
    try {
      await navigator.clipboard.writeText(color);
    } catch (err) {
      console.error('Failed to copy room ID: ', err);
    }
  }
  return (
    <div>
      {colors.map((color) => (
        <Chip
          avatar={
            <Avatar sx={{ bgcolor: color }}>
              <ContentCopyIcon fontSize='small' />
            </Avatar>
          }
          key={color}
          label={color}
          onClick={() => handleClick(color)}
          style={{ margin: '0.5rem' }}
        />
      ))}
    </div>
  );
}

ClickableChips.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ClickableChips;
