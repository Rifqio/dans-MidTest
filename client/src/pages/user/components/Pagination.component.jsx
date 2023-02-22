import { Button, Center, Flex, Text } from "@chakra-ui/react";

function PaginationComponent({
  dataPerPage,
  totalProduct,
  paginate,
  isLoading,
  isError,
  message,
  products,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProduct / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>{message}</Text>;
  }
  if (products) {
    return (
      <>
        <Center>
          <Flex>
            {pageNumbers.map((number) => (
              <div key={number}>
                <Button mx={"1"} onClick={() => paginate(number)}>
                  {number}
                </Button>
              </div>
            ))}
          </Flex>
        </Center>
      </>
    );
  }
}

export default PaginationComponent;
