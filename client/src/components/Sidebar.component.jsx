import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  Stack,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMe } from "../redux/slice/profileSlice";

function SidebarComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const dispatch = useDispatch();
  const { profile, isError, message } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getMe());
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(reset());
    navigate('/login')
  };
  return (
    <>
      <Box px={6}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Button variant={"ghost"} ref={btnRef} onClick={onOpen}>
            <HamburgerIcon boxSize={6} />
          </Button>
          <Text>My Dashboard</Text>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{profile.email}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="left"
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Welcome User!</DrawerHeader>

            <DrawerBody>
              <Menu>
                <MenuItem>
                  <Link to="/">Dashboard</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/products">Product List</Link>
                </MenuItem>
              </Menu>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default SidebarComponent;
