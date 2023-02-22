import { Button, Center, Flex, Text } from "@chakra-ui/react";

function PaginationComponent({ dataPerPage, totalProduct, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProduct / dataPerPage); i++) {
    pageNumbers.push(i);
  }

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

export default PaginationComponent;
