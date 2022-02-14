import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import PreviewIcon from "@mui/icons-material/Preview";

const routes = [
  { name: "View Students", icon: <PreviewIcon />, path: "/home" },
  { name: "New Student", icon: <AddIcon />, path: "/new" },
];

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const NavigationList = () => {
  const { pathname } = useLocation();
  return (
    <List>
      {routes.map(({ name, icon, path }, index) => (
        <div key={index}>
          <StyledLink to={path}>
            <ListItem button selected={pathname === path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </StyledLink>
        </div>
      ))}
    </List>
  );
};

export default NavigationList;
