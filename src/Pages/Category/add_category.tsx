import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Divider, Grid, Box, CardHeader, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import * as Yup from "yup";
import Loader from '../../Components/Carousel/loader';
import { SaveOutlined } from '@mui/icons-material';

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (categoryName: string) => void;
}

const initialValues = {
  email: "",
  password: "",
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});


const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ open, onClose, }) => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setCategoryName('');
    onClose();
  };

  const handleFormSubmit = async (values: any) => {
    // setLoading(true);
    // try {
    //   const requestData = {
    //     email: values.email,
    //     password: values.password,
    //   };
    //   const url= process.env.REACT_APP_API_URL + apiURL.LOGIN;
    // debugger
    //   const axiosResponse: AxiosResponse<any> = await postRequest(
    //     process.env.REACT_APP_API_URL + apiURL.LOGIN,
    //     requestData
    //   );
    //   const LoginApiResponse: any = axiosResponse.data;
    //   if (LoginApiResponse.success) {
    //     toast.success("Login Sucessfully !!");
    //     localStorage.setItem("Users", JSON.stringify(LoginApiResponse.resultData));
    //     navigate("/home");
    //   } else {
    //     setLoading(false);
    //     toast.error(LoginApiResponse.statusMessage);
    //   }
    //   setLoading(true);
    // } catch (e: any) {
    //   toast.error(e.message);
    //   setLoading(false);
    // }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <Box display="flex" justifyContent="space-between" alignItems="center" padding="8px">
        <CardHeader
          title="Add Category"
          titleTypographyProps={{ variant: 'h6' }}
          style={{ padding: 0 }}
        />
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 1,
            top: 2,
            // color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      <DialogContent>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              {loading && <Loader />}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoFocus
                    label="Category Name"
                    type="text"
                    fullWidth
                    size="small"
                    name="Category Name"
                    variant="outlined"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="SubCategory Name"
                    type="text"
                    fullWidth
                    size="small"
                    name="SubCategory Name"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button variant="contained" color="secondary" size="small" onClick={onClose}>Cancel</Button>
        <Button variant="contained" sx={{ my: 0 }} startIcon={<SaveOutlined />} size="small" onClick={handleAdd} >Save</Button>
      </DialogActions>


    </Dialog>
  );
};

export default AddCategoryDialog;
