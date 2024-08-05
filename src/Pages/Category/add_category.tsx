import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, TextField, Button, Divider, Grid, Box, CardHeader, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from 'formik';
import * as Yup from "yup";
import Loader from '../../Components/Carousel/loader';
import { SaveOutlined } from '@mui/icons-material';
import { AxiosResponse } from 'axios';
import { apiURL } from '../../Constant/ApiUrlConstant';
import { postRequest } from '../../Services/httpservice';

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCategory: (categoryName: string) => void;
}

const initialValues = {
  categoryName: "",
  subCategoryName: "",
};

// form field validation schema
const validationSchema = Yup.object().shape({
  categoryName: Yup.string()
    .required("Category is required!"),
  subCategoryName: Yup.string()
    .required("Sub Category is required!"),
});


const AddCategoryDialog: React.FC<AddCategoryDialogProps> = ({ open, onClose, }) => {
  // const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (values: any) => {
    debugger
    setLoading(false);
    try {
      setLoading(true);
      const requestData = {
        categoryName: values.categoryName,
        subCategoryName: values.subCategoryName,
      };
      const axiosResponse: AxiosResponse<any> = await postRequest(process.env.REACT_APP_API_URL + apiURL.ADD_CATEGORY, requestData);
      const LoginApiResponse: any = axiosResponse.data;
      if (LoginApiResponse.success) {
        setLoading(false);
        onClose();
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
    }
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
                    fullWidth
                    size="small"
                    type="text"
                    name="categoryName" // Ensure this matches initialValues
                    label="Category Name"
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.categoryName}
                    onChange={handleChange}
                    helperText={touched.categoryName && errors.categoryName}
                    error={Boolean(errors.categoryName && touched.categoryName)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="SubCategory Name"
                    type="text"
                    fullWidth
                    size="small"
                    name="subCategoryName" // Ensure this matches initialValues
                    variant="outlined"
                    onBlur={handleBlur}
                    value={values.subCategoryName}
                    onChange={handleChange}
                    helperText={touched.subCategoryName && errors.subCategoryName}
                    error={Boolean(errors.subCategoryName && touched.subCategoryName)}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
              <DialogActions style={{ padding: "0px !important" }}>
                <Button variant="contained" color="secondary" size="small" onClick={onClose}>Cancel</Button>
                <Button
                  variant="contained"
                  sx={{ my: 0 }}
                  startIcon={<SaveOutlined />}
                  size="small"
                  type="submit" // Ensure this is a submit button
                >
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
      <Divider />
    </Dialog>
  );
};

export default AddCategoryDialog;
