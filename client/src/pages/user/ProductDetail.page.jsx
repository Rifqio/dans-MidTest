import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Button,
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/slice/productSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getProductById(id));
    console.log(products);
  }, []);
  if (isLoading || !products) {
    return <Text>Loading....</Text>;
  }
  if (isError) {
    return <Text>{message}</Text>;
  }
  if (products && products.length !== 0) {
    return (
      <Center>
        <Card maxW="sm">
          <CardBody>
            <Image
              src={products.thumbnail}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{products.title}</Heading>
              <Text>{products.description}</Text>
              <Text color="blue.600" fontSize="2xl">
                ${products.price}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue">
                Buy now
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Center>
    );
  }
}

export default ProductDetail;
