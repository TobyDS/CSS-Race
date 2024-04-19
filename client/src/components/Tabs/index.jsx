import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tab from '@mui/material/Tab';
import JoinGameTab from '@components/Tabs/joinGameTab';
import CreateGameTab from '@components/Tabs/createGameTab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function Tabs ({ value, onChange }) {
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          variant='fullWidth'
          onChange={onChange}
          aria-label='lab API tabs example'
        >
          <Tab label='Join a Game' value='1' />
          <Tab label='Create a New Game' value='2' />
        </TabList>
      </Box>
      <TabPanel value='1' sx={{ p: 0, m: 0, height: '250px' }}>
        <JoinGameTab />
      </TabPanel>
      <TabPanel value='2' sx={{ p: 0, m: 0, height: '250px' }}>
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
