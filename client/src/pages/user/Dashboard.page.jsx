import { Text, Square, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/slice/profileSlice";

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
