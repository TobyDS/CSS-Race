import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from 'react';

interface ClickableChipsProps {
  colors: string[];
}

function ClickableChips ({ colors }: ClickableChipsProps) {
  const [tooltipStates, setTooltipStates] = useState<
    Record<string, { text: string; open: boolean }>
  >(
    colors.reduce(
      (acc, color) => {
        acc[color] = { text: 'Copy', open: false };
        return acc;
      },
      {} as Record<string, { text: string; open: boolean }>
    )
  );

  useEffect(() => {
    // Initialize tooltip states for new colors
    setTooltipStates((prevState) =>
      colors.reduce(
        (acc, color) => {
          acc[color] = prevState[color] || { text: 'Copy', open: false };
          return acc;
        },
        {} as Record<string, { text: string; open: boolean }>
      )
    );
  }, [colors]);

  const handleClick = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color); // Copy the color code

      // Update tooltip state to "Copied" and set it to open
      setTooltipStates((prevState) => ({
        ...prevState,
        [color]: { text: 'Copied', open: true },
      }));

      // Set a timeout to close the tooltip after 2 seconds
      setTimeout(() => {
        setTooltipStates((prevState) => ({
          ...prevState,
          [color]: { ...prevState[color], open: false },
        }));

        // Delay resetting the tooltip text back to "Copy" by 300ms after closing
        setTimeout(() => {
          setTooltipStates((prevState) => ({
            ...prevState,
            [color]: { ...prevState[color], text: 'Copy' },
          }));
        }, 300); // Delay for text reset
      }, 2000);
    } catch (err) {
      console.error('Failed to copy color: ', err);
    }
  };

  const handleMouseEnter = (color: string) => {
    // Show "Copy" tooltip when mouse enters, only if not already in "Copied" state
    setTooltipStates((prevState) => ({
      ...prevState,
      [color]: {
        text: prevState[color].text === 'Copied' ? 'Copied' : 'Copy',
        open: true,
      },
    }));
  };

  const handleMouseLeave = (color: string) => {
    // Close tooltip only if it's not in the "Copied" state
    setTooltipStates((prevState) => ({
      ...prevState,
      [color]: {
        ...prevState[color],
        open: prevState[color].text === 'Copied', // Keep open if text is "Copied"
      },
    }));
  };

  return (
    <div>
      {colors.map((color) => (
        <Tooltip
          key={color}
          open={tooltipStates[color]?.open || false}
          title={tooltipStates[color]?.text || 'Copy'}
          arrow
        >
          <Chip
            avatar={
              <Avatar sx={{ bgcolor: color }}>
                <ContentCopyIcon fontSize='small' />
              </Avatar>
            }
            label={color}
            onClick={() => handleClick(color)}
            onMouseEnter={() => handleMouseEnter(color)}
            onMouseLeave={() => handleMouseLeave(color)}
            style={{ margin: '0.5rem' }}
          />
        </Tooltip>
      ))}
    </div>
  );
}

export default ClickableChips;
