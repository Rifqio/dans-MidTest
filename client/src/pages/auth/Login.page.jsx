import {
  Container,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  FormHelperText,
  Text,
  Button,
  Input,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/authSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const payload = {email, password}
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(payload));
    // navigate("/");
  };

  return (
    <Container my={20}>
      <Card>
        <CardBody>
          <Center>
            <CardHeader fontSize={24} fontWeight={"medium"}>
              Please Login To Continue
            </CardHeader>
            {isError && <p>{message}</p>}
          </Center>
          <form onSubmit={handleSubmit}>
            <FormControl my={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <InputRightElement width="4.5rem">
                  <Button variant={"link"} m={"auto"} onClick={handlePassword}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text>
                Don't have an account? <Link to="/register"> Register</Link>
              </Text>
              <Button
                isLoading={isLoading}
                loadingText="Submitting"
                type="submit"
                colorScheme="teal"
              >
                Submit
              </Button>
            </Box>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default LoginPage;
