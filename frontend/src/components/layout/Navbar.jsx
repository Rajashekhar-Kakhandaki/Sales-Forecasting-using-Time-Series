import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Tooltip,
  InputBase,
  Chip,
} from "@mui/material";

import {
  Menu,
  Search,
  NotificationsNone,
  DarkModeOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

function Navbar({ toggleSidebar }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#1E293B",
        borderBottom: "1px solid #E5E7EB",
        zIndex: 1201,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "75px",
        }}
      >
        {/* Left Section */}
        <Box display="flex" alignItems="center" gap={3}>
          <Tooltip title="Collapse Sidebar">
            <IconButton
              onClick={toggleSidebar}
              sx={{
                bgcolor: "#EFF6FF",
                "&:hover": {
                  bgcolor: "#DBEAFE",
                },
              }}
            >
              <Menu sx={{ color: "#2563EB" }} />
            </IconButton>
          </Tooltip>

          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
            >
              Sales Forecast Dashboard
            </Typography>

            <Typography
              variant="body2"
              color="gray"
            >
              Time Series Analysis
            </Typography>
          </Box>
        </Box>

        {/* Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#F8FAFC",
            border: "1px solid #E5E7EB",
            borderRadius: 3,
            px: 2,
            width: 380,
            height: 45,
          }}
        >
          <Search
            sx={{
              color: "#94A3B8",
              mr: 1,
            }}
          />

          <InputBase
            placeholder="Search reports..."
            sx={{
              flex: 1,
            }}
          />
        </Box>

        {/* Right */}
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Chip
            label={today}
            color="primary"
            variant="outlined"
          />

          <Tooltip title="Dark Mode">
            <IconButton>
              <DarkModeOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings">
            <IconButton>
              <SettingsOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton>
              <Badge
                badgeContent={5}
                color="error"
              >
                <NotificationsNone />
              </Badge>
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              bgcolor: "#2563EB",
              width: 45,
              height: 45,
              fontWeight: "bold",
            }}
          >
            RK
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;