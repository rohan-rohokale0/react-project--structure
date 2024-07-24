import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../../Services/httpservice";
import axios, { AxiosError } from "axios";
import { apiURL } from "../../Constant/ApiUrlConstant";
import AddCategoryDialog from "./add_category";
import { Edit, RemoveRedEyeRounded } from "@mui/icons-material";
import { Box, Button, Card, CardHeader, Grid, IconButton, styled, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Loader from "../../Components/Carousel/loader";

export interface CategoryViewModel {
  categoryId: string;
  categoryName: string;
  subCategoryName: string;
}

// const StyledTable = styled(Table)(() => ({
//   whiteSpace: "pre",
//   "& thead": {
//     "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
//   },
//   "& tbody": {
//     "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
//   },
// }));
const HR = styled("hr")(({ theme }) => ({
  // margin: "10px 0px 24px",
  flexShrink: "0",
  borderWidth: "0px 0px thin",
  borderStyle: "solid",
  // borderColor: "rgba(0,0,0.12)",
}));
export default function CategoryList() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categorysList, setCategoryList] = useState<CategoryViewModel[]>([]);
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };


  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    getAllCategoryList();
  }, []);

  const getAllCategoryList = async () => {
    setIsLoading(true);
    try {
      const response = await getRequest(
        process.env.REACT_APP_API_URL + apiURL.GET_CATEGORY
      );
      if (response == null)
        throw new Error(`HTTP error! Status`);
      if (response != null) {
        const data = response.data;
        setCategoryList(data);
        setIsLoading(false);
      }
      else {
        navigate('/');
        setIsLoading(false);
        return;

      }
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          if (axiosError?.response.status == 401) {
            navigate('/');
          }
        }
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Grid item xs={12}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px">
            <CardHeader
              title="Category List"
              titleTypographyProps={{ variant: 'h6' }}
              style={{ padding: 0 }}
            />
            <Button variant="contained"  size="small" onClick={handleOpenDialog}>
              Add Category
            </Button>
          </Box>
          
          <AddCategoryDialog
            open={isDialogOpen}
            onClose={handleCloseDialog} onAddCategory={function (categoryName: string): void {
              throw new Error("Function not implemented.");
            }}
          />

          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 375 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ minWidth: 1 }}>Id</TableCell>
                    <TableCell align="center">Category Name</TableCell>
                    <TableCell align="center">SubCategory Name</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="transactionTable-tablebody">
                  {categorysList.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3}>
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
                      ? categorysList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : categorysList
                    ).map((row, index) => (
                      <TableRow key={index}>
                        <TableCell align="left" sx={{ padding: '8px 20px' }}> {row.categoryId}</TableCell>
                        <TableCell align="center" sx={{ padding: '8px 20px' }}>{row.categoryName}</TableCell>
                        <TableCell align="center" sx={{ padding: '8px 20px' }}>
                          {row.subCategoryName}
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
              count={categorysList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

          </Paper>

        </Card>
      </Grid>
    </>
  );
}
