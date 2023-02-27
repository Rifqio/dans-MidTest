import { Text, Square, Center, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/slice/profileSlice";
import { reset } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const dispatch = useDispatch();
  const { profile, isError, message } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <Center>
      {isError && <Text fontSize='3xl' color='tomato' fontWeight={'bold'}>{message}</Text> }
      <Text>Welcome {profile.name} or {profile.email} 😁</Text>
    </Center>
  );
}

export default DashboardPage;
