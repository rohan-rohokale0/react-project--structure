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
import { string } from "yup";
import { get } from "http";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Loader from "../../Components/Carousel/loader";
import { Edit, RemoveRedEyeRounded } from "@mui/icons-material";

export interface MerchantMasterViewModel {
  id: number;
  productName: string;
  categoryName: string;
  status: boolean;
  productImage: any;
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
        "http://localhost:5454/api/product/get-product"
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

  return (
    // <div>
    //   {isLoading && <Loader />}
    //   <Card variant="outlined" sx={{ p: 2, mb: 20 }}>
    //     <Grid container sx={{ mt: 2 }} justifyContent={"space-between"}>
    //       <Grid>
    //         <Typography variant="h6">Product</Typography>
    //       </Grid>
    //       <Grid item justifyContent={"flex-end"}>
    //         <Button variant="contained" onClick={navigateToAddProduct}>
    //           Add Product
    //         </Button>
    //       </Grid>
    //     </Grid>

    //     <Divider sx={{ mt: 2 }}></Divider>
    //     <Box width="100%" overflow="auto">

    //       <TableHead>
    //         <TableRow>
    //           <TableCell align="left">Id</TableCell>
    //           <TableCell align="center">Category Name</TableCell>
    //           <TableCell align="center">Product Image</TableCell>
    //           <TableCell align="center">Product Name</TableCell>
    //           <TableCell align="center">Status</TableCell>
    //           <TableCell align="center">Action</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody className="transactionTable-tablebody">
    //         {(rowsPerPage > 0
    //           ? merchantDetailsList.slice(
    //             page * rowsPerPage,
    //             page * rowsPerPage + rowsPerPage
    //           )
    //           : merchantDetailsList
    //         ).map((row: any, index: any) => (




    //           <TableRow key={index}>
    //             <TableCell align="left">{row.id}</TableCell>
    //             <TableCell align="center">{row.categoryName}</TableCell>
    //             <TableCell align="center">
    //               {
    //                 <img
    //                   style={{ height: "5vh" }}
    //                   src={row.productImage}
    //                 />
    //               }
    //             </TableCell>
    //             <TableCell align="center">{row.productName}</TableCell>
    //             <TableCell align="center">
    //               {getStatusValue(row.status)}
    //             </TableCell>
    //             <TableCell align="center">
    //               <IconButton aria-label="Edit" color="primary" onClick={() => navigateToUpdateProduct(row.id)}>
    //                 <EditIcon />
    //               </IconButton>
    //               <IconButton aria-label="delete" color="primary">
    //                 <RemoveRedEyeIcon />
    //               </IconButton>
    //               <IconButton aria-label="delete" color="primary">
    //                 <DeleteIcon />
    //               </IconButton>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>

    //       <TablePagination
    //         sx={{ px: 2 }}
    //         page={page}
    //         component="div"
    //         rowsPerPage={rowsPerPage}
    //         count={merchantDetailsList.length}
    //         onPageChange={handleChangePage}
    //         rowsPerPageOptions={[5, 10, 25]}
    //         onRowsPerPageChange={handleChangeRowsPerPage}
    //         nextIconButtonProps={{ "aria-label": "Next Page" }}
    //         backIconButtonProps={{ "aria-label": "Previous Page" }}
    //       />
    //     </Box>

    //   </Card>
    // </div>




    <div>
      {isLoading && <Loader />}
      <Grid item xs={12}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px">
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

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 375 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ minWidth: 1 }}>Id</TableCell>
                    <TableCell align="center">Product Name</TableCell>
                    <TableCell align="center">Category Name</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="transactionTable-tablebody">
                  {productList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          align="center"
                        >
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
                        <TableCell align="left" sx={{ padding: '8px 20px' }}> {row.productName}</TableCell>
                        <TableCell align="center" sx={{ padding: '8px 20px' }}>{row.categoryName}</TableCell>
                        <TableCell align="center" sx={{ padding: '8px 20px' }}>
                          {row.status}
                        </TableCell>
                        <TableCell align="center" sx={{ padding: '4px 8px' }}>
                          <IconButton aria-label="delete" color="primary">
                            <DeleteIcon />
                          </IconButton>
                          <IconButton aria-label="delete" color="primary">
                            <Edit />
                          </IconButton>
                          <IconButton aria-label="delete" color="primary">
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
              component='div'
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
