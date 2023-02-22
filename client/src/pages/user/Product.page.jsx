import { Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { instance } from "../../lib/instance";
import ProductComponent from "./components/Product.component";
import PaginationComponent from "./components/Pagination.component";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/slice/productSlice";

function ProductPage() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);
  const getData = async () => {
    dispatch(getProducts());
    console.log(products);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(products);
  const indexOfLastProduct = currentPage * dataPerPage;
  const indexOfFirstProduct = indexOfLastProduct - dataPerPage;
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <ProductComponent
        isError={isError}
        isLoading={isLoading}
        message={message}
        products={currentProduct}
      />
      <PaginationComponent
        dataPerPage={dataPerPage}
        totalProduct={products.length}
        paginate={paginate}
      />
    </>
  );
}

export default ProductPage;
