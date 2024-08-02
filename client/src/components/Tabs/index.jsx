import { TabContext, TabList, TabPanel } from '@mui/lab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';

import CreateGameTab from '@components/Tabs/createGameTab';
import JoinGameTab from '@components/Tabs/joinGameTab';

function Tabs ({ value, onChange }) {
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          variant='fullWidth'
          onChange={onChange}
          aria-label='Join or Create a Game'
        >
          <Tab label='Join a Game' value='Join' />
          <Tab label='Create a New Game' value='Create' />
        </TabList>
      </Box>
      <TabPanel value='Join' sx={{ p: 0, m: 0, height: '250px' }}>
        <JoinGameTab />
      </TabPanel>
      <TabPanel value='Create' sx={{ p: 0, m: 0, height: '250px' }}>
        <CreateGameTab />
      </TabPanel>
    </TabContext>
  );
}

Tabs.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Tabs;
