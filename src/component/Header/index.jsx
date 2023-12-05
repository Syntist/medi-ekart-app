import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../AuthContext";
import { ADMIN, MEDOXER, PROVIDER } from "../../constant";
import { useNavigate } from "react-router-dom";

function ResponsiveAppBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Medi-eKart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              account
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/");
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/orders");
                }}
              >
                <Typography textAlign="center">Orders</Typography>
              </MenuItem>

              {user.type === ADMIN && (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/admin");
                  }}
                >
                  <Typography textAlign="center">Admin Dashboard</Typography>
                </MenuItem>
              )}

              {user.type === PROVIDER && (
                <>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/provider/medicines");
                    }}
                  >
                    <Typography textAlign="center">My Products</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/provider/create");
                    }}
                  >
                    <Typography textAlign="center">Create Product</Typography>
                  </MenuItem>
                </>
              )}

              {user.type === MEDOXER && (
                <>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/medoxer/medicines");
                    }}
                  >
                    <Typography textAlign="center">
                      Medicines Dashboard
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/medoxer/orders");
                    }}
                  >
                    <Typography textAlign="center">Orders Dashboard</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Medi-eKart
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/");
                handleCloseNavMenu();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>

            <Button
              onClick={() => {
                navigate("/orders");
                handleCloseNavMenu();
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Orders
            </Button>

            {user.type === ADMIN && (
              <Button
                onClick={() => {
                  navigate("/admin");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Admin Dashboard
              </Button>
            )}

            {user.type === PROVIDER && (
              <>
                <Button
                  onClick={() => {
                    navigate("/provider/medicines");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  My Products
                </Button>
                <Button
                  onClick={() => {
                    navigate("/provider/create");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Create Product
                </Button>
              </>
            )}

            {user.type === MEDOXER && (
              <>
                <Button
                  onClick={() => {
                    navigate("/medoxer/medicines");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Medicines Dashboard
                </Button>
                <Button
                  onClick={() => {
                    navigate("/medoxer/orders");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Orders Dashboard
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate("/account");
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/");
                  logout();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
