import { styled } from "@mui/material/styles";
import DrawerHeader from "../components/DrawerHeader";
import { DRAWER_WIDTH } from "../utils/constants";

const MainContainer = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Main = ({ open, children }) => {
  return (
    <MainContainer open={open}>
      <DrawerHeader />
      {children}
    </MainContainer>
  );
};

export default Main;
