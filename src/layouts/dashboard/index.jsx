import { Avatar, Box, IconButton, Switch } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#177ddc',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255,255,255,.35)',
    }),
  },
}));

const DashboardLayout = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const {onToggleMode} = useSettings();
  return (
    <>
      <Stack
        padding={2}
        direction="row"
        height="100vh"
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent={"space-between"}
          width={100}
          height="100%"
          boxShadow="0px 0px 2px rgba(0,0,0,0.25)"
          spacing={3}
        >
          <Stack alignItems={"center"} spacing={4}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: 64,
                width: 64,
                borderRadius: 1.5,
              }}
            >
              <img src={Logo} alt={"Chat App Logo"} />
            </Box>
            <Stack
              sx={{ width: "max-content" }}
              direction="column"
              alignItems="center"
              spacing={3}
            >
              {Nav_Buttons.map((el) =>
                el.index === selected ? (
                  <Box
                    p={1}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      sx={{ width: "max-content", color: "#fff" }}
                      key={el.index}
                    >
                      {el.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    onClick={() => {
                      setSelected(el.index);
                    }}
                    sx={{ width: "max-content", color: theme.palette.mode==="light"? "#000":theme.palette.text.primary }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                )
              )}
              <Divider sx={{ width: "48px" }} />
              {selected === 3 ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton sx={{ width: "max-content", color: "#fff" }}>
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(3);
                  }}
                  sx={{ width: "max-content", color: theme.palette.mode==="light"? "#000":theme.palette.text.primary }}
                >
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>

          <Stack spacing={4}>
            <AntSwitch onChange={()=>{
              onToggleMode();
            }} defaultChecked />
            <Avatar src={faker.image.animals()} />
          </Stack>
        </Stack>
        <Box width="100%" padding={4} flex={1}>
          <Outlet />
        </Box>
      </Stack>
      
    </>
  );
};

export default DashboardLayout;
