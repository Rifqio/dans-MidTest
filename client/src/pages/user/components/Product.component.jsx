import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Text,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ProductComponent({ products, isLoading, isError, message }) {
  if (isLoading) {
    return <Text>Loading....</Text>;
  }
  if (isError) {
    return <Text>{message}</Text>;
  }
  if (products.length !== 0) {
    return (
      <Container mb={"4"}>
        <TableContainer>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th>Product Name</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products &&
                products.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </Td>
                    <Td>{`$ ${product.price}`}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default ProductComponent;
