import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import NavigationList from "./NavigationList";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DRAWER_WIDTH } from "../utils/constants";
import DrawerHeader from "../components/DrawerHeader";
import Divider from "@mui/material/Divider";
import IconButton from '@mui/material/IconButton';

const Navigation = ({open, handleDrawerClose}) => {
  const theme = useTheme();

  return (
    <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavigationList />
        <Divider />
      </Drawer>
  );
};

export default Navigation;
