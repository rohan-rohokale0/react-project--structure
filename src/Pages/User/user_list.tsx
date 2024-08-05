import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "../../Services/httpservice";
import axios, { AxiosError } from "axios";
import { apiURL } from "../../Constant/ApiUrlConstant";
import { Edit, RemoveRedEyeRounded, SaveOutlined } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Card, CardHeader, Divider, Grid, IconButton, styled, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Loader from "../../Components/Carousel/loader";
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Menu as MenuIcon, Dashboard as DashboardIcon, Category as CategoryIcon, Person as PersonIcon, ExitToApp as ExitToAppIcon, AccountCircle } from '@mui/icons-material';
import AddCategoryDialog from "../Category/add_category";
import ViewCategoryDialog from "../Category/view_category";
import DeleteCategoryDialog from "../Category/delete_category";
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
export interface CategoryViewModel {
  categoryId: string;
  categoryName: string;
  subCategoryName: string;
}

export default function UserList() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [categorysList, setCategoryList] = useState<CategoryViewModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleChangePage = (_: any, newPage: React.SetStateAction<number>) => {
    setPage(newPage);
  };
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryViewDialogOpen, setIsCategoryViewDialogOpen] = useState(false);
  const [isCategoryDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


  const handleChangeRowsPerPage = (event: {
    target: { value: string | number };
  }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };


  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    if (isDialogOpen) {
      getAllCategoryList();
    }
  };


  const handleViewCategoryOpenDialog = (id: string) => {
    setSelectedCategoryId(id);
    setIsCategoryViewDialogOpen(true);
  };

  const handleViewCategoryCloseDialog = () => {
    setIsCategoryViewDialogOpen(false);
    setSelectedCategoryId(null);
  };

  const handleDeletCategoryOpenDialog = (id: string) => {
    setSelectedCategoryId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeletCategoryCloseDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCategoryId(null);
    if (isCategoryDeleteDialogOpen) {
      getAllCategoryList();
    }
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
              <GroupIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              User List
            </Typography>
          </Breadcrumbs>
        </Box>
        {/* <Divider /> */}
      </div>
      {isLoading && <Loader />}
      <Grid item xs={12}>
        <Card>
          <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px">
            <CardHeader
              title="User List"
              titleTypographyProps={{ variant: 'h6' }}
              style={{ padding: 0 }}
            />
            <Button variant="contained"  startIcon={<AddIcon />} size="small" onClick={handleOpenDialog}>
              Add User
            </Button>
          </Box>
          <Divider />

          <AddCategoryDialog
            open={isDialogOpen}
            onClose={handleCloseDialog} onAddCategory={function (categoryName: string): void {
              throw new Error("Function not implemented.");
            }}
          />

          <ViewCategoryDialog
            open={isCategoryViewDialogOpen}
            id={selectedCategoryId}
            onClose={handleViewCategoryCloseDialog}
            onAddCategory={(categoryName: string) => {
              // Implement your add category logic here
            }}
          />

          <DeleteCategoryDialog
            open={isCategoryDeleteDialogOpen}
            id={selectedCategoryId}
            onClose={handleDeletCategoryCloseDialog}
            onAddCategory={(categoryName: string) => {
              // Implement your add category logic here
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
                          <IconButton aria-label="delete" color="primary" onClick={() => handleDeletCategoryOpenDialog(row.categoryId)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton aria-label="Edit" color="primary">
                            <Edit />
                          </IconButton>
                          <IconButton aria-label="view" color="primary" onClick={() => handleViewCategoryOpenDialog(row.categoryId)}>
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


