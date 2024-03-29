import { Box } from '@mui/material';

type Props = {
  value: number;
  index: number;
  children: React.ReactNode;
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export const MuiTabPanel = ({ value, index, children }: Props) => (
  <TabPanel value={value} index={index}>
    {children}
  </TabPanel>
);
