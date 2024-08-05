import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../Services/httpservice";
import axios, { AxiosError } from "axios";
import styled from "@emotion/styled";
import Loader from "../../Components/Carousel/loader";
import { Edit, RemoveRedEyeRounded } from "@mui/icons-material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import { apiURL } from "../../Constant/ApiUrlConstant";
import DeleteProductDialog from "./delete_product";

export interface MerchantMasterViewModel {

  productId: string;
  productName: string;
  productCode: string;
  productPrice: number;
  productSalePrice: number;
  productQTY: number;
  productDescription: string;
  productImage: string;
  categoryId: string;
  categoryName: string;
  subCategoryName: string;
}


export default function ProductList() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productList, setProductDetails] = useState<
    MerchantMasterViewModel[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleChangePage = (_: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };
  const [isCategoryDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleChangeRowsPerPage = (event: {
    target: { value: string | number };
  }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const CardContentNoPadding = styled(CardContent)(`
    padding: 0;
    &:last-child {
      padding-bottom: 0;
    }
  `);
  const [open, setDialogOpen] = React.useState(false);
  const navigateToAddProduct = async () => {
    navigate("/home/product-list/add-product");
  };
  const getStatusValue = (value: any) => {
    return value.toString();
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    getTransactionDetails();
  }, []);

  const getTransactionDetails = async () => {
    setIsLoading(true);

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await getRequest(
        process.env.REACT_APP_API_URL + apiURL.GET_PRODUCT
      );
      if (response == null) throw new Error(`HTTP error! Status`);

      if (response.status === 401) {
        navigate("/");
        return;
      }
      const data = response.data;
      setProductDetails(data);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);

        const axiosError = error as AxiosError;
        if (axiosError.response) {
          if (axiosError?.response.status == 401) {
            navigate("/");
          }
        }
      }
    }
  };
  const { productId } = useParams<{ productId: string }>();

  const navigateToUpdateProduct = async (id: any) => {
    navigate(`/home/update-product?id=${id}`);
  }
  const handleOnAgree = (event: any, reason: any) => {
    debugger;
    // do action to handle on agree deleting an user
    // dispatch(deleteUser({ title: "Delete User", details: selectedUser }));
    if (reason && reason === "backdropClick") return;
    else {
      setDialogOpen(false);
    }
  };

  const handleDeletCategoryOpenDialog = (id: string) => {
    setSelectedCategoryId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletCategoryCloseDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCategoryId(null);
    if (isCategoryDeleteDialogOpen) {
      getTransactionDetails();
    }
  };


  return (
    <div>
      <div role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1, ml: 1 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
              href="/"
            >
              <HomeIcon sx={{ mr: 0.2 }} fontSize="inherit" />
              Home
            </Link>

            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              <ProductionQuantityLimitsTwoToneIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Product List
            </Typography>
          </Breadcrumbs>

        </Box>
        {/* <Divider /> */}
      </div>

      {isLoading && <Loader />}
      <Grid item xs={12} style={{ marginTop: 12 }}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px" >
            <CardHeader
              title="Product List"
              titleTypographyProps={{ variant: 'h6' }}
              style={{ padding: 0 }}
            />
            <Button variant="contained" size="small" onClick={navigateToAddProduct}>
              Add Product
            </Button>
          </Box>
          <Divider />

          <DeleteProductDialog
            open={isCategoryDeleteDialogOpen}
            id={selectedCategoryId}
            onClose={handleDeletCategoryCloseDialog}
            onAddCategory={(categoryName: string) => {
              // Implement your add category logic here
            }}
          />

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 375, overflowY: 'auto' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead sx={{ backgroundColor: '#f5f5f5', height: 60 }}>
                  <TableRow>
                    <TableCell className="table-cell" sx={{ padding: '2px 4px', fontWeight: 'bold' }}>Category Name</TableCell>
                    <TableCell className="table-cell" sx={{ padding: '2px 4px', fontWeight: 'bold' }}>SubCategory Name</TableCell>
                    <TableCell className="table-cell" sx={{ padding: '2px 4px', fontWeight: 'bold' }}>Product Name</TableCell>
                    <TableCell className="table-cell" sx={{ padding: '2px 4px', fontWeight: 'bold' }}>Product Image</TableCell>
                    <TableCell className="table-cell" sx={{ padding: '2px 4px', fontWeight: 'bold' }}>Product Price</TableCell>
                    <TableCell className="table-cell" sx={{ padding: '2px 4px', fontWeight: 'bold' }}>Product QTY</TableCell>
                    <TableCell className="table-cell" sx={{ padding: '2px 4px', fontWeight: 'bold' }}>Product Description</TableCell>
                    <TableCell className="table-cell" sx={{ padding: '2px 4px', fontWeight: 'bold' }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography variant="subtitle1" color="textSecondary">
                          No data available in table
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    (rowsPerPage > 0
                      ? productList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : productList
                    ).map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="table-cell" sx={{ padding: '2px 4px', }}>{row.categoryName}</TableCell>
                        <TableCell className="table-cell" sx={{ padding: '2px 4px', }}>{row.subCategoryName}</TableCell>
                        <TableCell className="table-cell" sx={{ padding: '2px 4px', }}>{row.productName}</TableCell>
                        <TableCell className="table-cell" sx={{ padding: '2px 4px', }}>
                          <img
                            src={row.productImage}
                            alt="Product"
                            style={{ maxWidth: '5vh', maxHeight: '5vh' }}
                          />
                        </TableCell>
                        <TableCell className="table-cell" sx={{ padding: '2px 4px', }}>{row.productPrice}</TableCell>
                        <TableCell className="table-cell" sx={{ padding: '2px 4px', }}>{row.productQTY}</TableCell>
                        <TableCell className="table-cell" sx={{ padding: '2px 4px', }}>{row.productDescription}</TableCell>
                        <TableCell className="table-cell" sx={{ padding: '4px 8px' }}>
                          <IconButton aria-label="delete" color="primary" onClick={() => handleDeletCategoryOpenDialog(row.productId)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton aria-label="edit" color="primary">
                            <Edit />
                          </IconButton>
                          <IconButton aria-label="view" color="primary">
                            <RemoveRedEyeRounded />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={productList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Card>
      </Grid>
    </div>
  );
}
