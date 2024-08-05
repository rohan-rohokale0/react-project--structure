import { Breadcrumbs, CardHeader, Link, MenuItem, SelectChangeEvent, styled, Typography } from "@mui/material";
import { Box, Button, Divider, Grid, IconButton, TextField, } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getRequest, postRequest } from "../../Services/httpservice";
import axios, { AxiosError, AxiosResponse } from "axios";
import { apiURL } from "../../Constant/ApiUrlConstant";
import FileUpload from "react-material-file-upload";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../../Components/Carousel/loader";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import HomeIcon from '@mui/icons-material/Home';
import { Add } from "@mui/icons-material";

export interface CategoryViewModel {
  categoryId: string;
  categoryName: string;
}

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

export default function AddProduct() {
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");
  const [categoryList, setCategoryDetails] = useState<CategoryViewModel[]>([]);
  const [imageUrl, setImageUrl] = useState<any | null>(null);
  const [collapseUpper, setCollapseUpper] = React.useState(false);
  const [productImageBase64, SetProductImage] = React.useState<any | null>(
    null
  );
  const [files, setFiles] = useState<any>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const NavigateToBack = async () => {
    navigate("/home/product-list");
  };

  const validationSchema = Yup.object({
    productName: Yup.string().required("Please Enter Product Name"),
    categoryName: Yup.string().required("Please Select Category Name"),
    productCode: Yup.string().required("Please Enter Product Code"),
    productPrice: Yup.string().required("Please Enter Product Price"),
    productSalePrice: Yup.string().required("Please Enter Product Sale Price"),
    productQuanitity: Yup.string().required("Please Enter Product Quanitity"),
    productDescription: Yup.string().required("Please Enter Product Descriptions"),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      categoryName: "",
      productCode: "",
      productPrice: "",
      productSalePrice: "",
      productQuanitity: "",
      productDescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log(files);
      try {
        const requestData = {
          productName: values.productName,
          categoryId: values.categoryName,
          productCode: values.productCode,
          productPrice: parseInt(values.productPrice),
          productSalePrice: parseInt(values.productSalePrice),
          productQTY: parseInt(values.productQuanitity),
          productDescription: values.productDescription,
          productImage: productImageBase64,
          //productStatus: true,
        };
        const axiosResponse: AxiosResponse<any> = await postRequest(process.env.REACT_APP_API_URL + apiURL.ADD_PRODUCT,requestData);
        if (axiosResponse.status == 200) {
          const LoginApiResponse: any = axiosResponse.data;
          navigate("/home/product-list/");
          //toast.success(LoginApiResponse.message);
        }
        setIsLoading(false);
      } catch (e: any) {
        //toast.error(e.message);
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    getCategoryDetails();
  }, []);

  const getCategoryDetails = async () => {
    try {
      setIsLoading(true);
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await getRequest(process.env.REACT_APP_API_URL + apiURL.GET_CATEGORY);
      if (response == null) throw new Error(`HTTP error! Status`);
      if (response.status === 401) {
        return;
      }
      const data = response.data;
      //
      setCategoryDetails(data);
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

  const handleFileUpload = async (event: any) => {
    const file = event;

    // setFiles(event);
    debugger;
    const base64 = await convertBase64(file);
    SetProductImage(base64);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleCollapse = () => {
    setCollapseUpper((prevState) => !prevState);
  };
  const imageClear = () => {
    setImageUrl(null);
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
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
            >
              <Add sx={{ mr: 0.5 }} fontSize="inherit" />
              Add Product
            </Typography>
          </Breadcrumbs>

        </Box>
        {/* <Divider /> */}
      </div>
      {isLoading && <Loader />}
      <Grid item xs={12}>
        <Card>
          <Box display="flex" alignItems="center" padding="5px">
            <IconButton edge="start" color="inherit" aria-label="back" sx={{ mr: 0 }} onClick={NavigateToBack}>
              <ArrowBackIcon />
            </IconButton>
            <CardHeader
              title="Product List"
              titleTypographyProps={{ variant: 'h6' }}
              sx={{ padding: 0, flexGrow: 0 }}
            />
          </Box>
          <Divider />
          
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction="row" spacing={2} sx={{ pt: 1.5, paddingLeft: 1, paddingRight: 2 }} columns={{ xs: 4, md: 12 }}>
              <Grid item xs={6} >
                <TextField id="productName" name="productName" label="Product Name"
                  placeholder="Product Name" size="small" variant="outlined" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur}
                  value={formik.values.productName} error={formik.touched.productName && Boolean(formik.errors.productName)}
                  helperText={formik.touched.productName && formik.errors.productName}
                />
              </Grid>
              <Grid item xs={6} >
                <TextField id="filled-select-currency" select label="Category Name" placeholder="Category Name" defaultValue="EUR"
                  name="categoryName" fullWidth size="small" value={formik.values.categoryName} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                  helperText={formik.touched.categoryName && formik.errors.categoryName}>
                  {categoryList.map((option: any) => (
                    <MenuItem key={option.categoryName} value={option.categoryId}>
                      {option.categoryName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField id="productCode" name="productCode" label="Product Code" placeholder="Product Code" size="small"
                  variant="outlined" fullWidth onChange={formik.handleChange} onBlur={formik.handleBlur}
                  value={formik.values.productCode} error={formik.touched.productCode && Boolean(formik.errors.productCode)}
                  helperText={formik.touched.productCode && formik.errors.productCode}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="productPrice"
                  name="productPrice"
                  label="Product Price"
                  placeholder="Product Price"
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 4 }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productPrice}
                  error={
                    formik.touched.productPrice &&
                    Boolean(formik.errors.productPrice)
                  }
                  helperText={
                    formik.touched.productPrice && formik.errors.productPrice
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="productSalePrice"
                  name="productSalePrice"
                  label="Product Sale Price"
                  placeholder="Product Sale Price"
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 4 }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productSalePrice}
                  error={
                    formik.touched.productSalePrice &&
                    Boolean(formik.errors.productSalePrice)
                  }
                  helperText={
                    formik.touched.productSalePrice &&
                    formik.errors.productSalePrice
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="productQuanitity"
                  name="productQuanitity"
                  label="Product Quantity"
                  placeholder="Product Quantity"
                  size="small"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 4 }}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                  value={formik.values.productQuanitity}
                  error={
                    formik.touched.productQuanitity &&
                    Boolean(formik.errors.productQuanitity)
                  }
                  helperText={
                    formik.touched.productQuanitity &&
                    formik.errors.productQuanitity
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="productDescription"
                  label="Product Descriptions"
                  placeholder="Product Descriptions"
                  multiline
                  rows={6.5}
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ mb: 2 }}
                  value={formik.values.productDescription}
                  error={
                    formik.touched.productDescription &&
                    Boolean(formik.errors.productDescription)
                  }
                  helperText={
                    formik.touched.productDescription &&
                    formik.errors.productDescription
                  }
                />
              </Grid>
              {imageUrl == null && (
                <Grid item xs={6} >
                  <FileUpload
                    value={files}
                    onChange={(files) => handleFileUpload(files[0])}
                  />
                </Grid>
              )}
              {imageUrl != null && (
                <Grid item xs={6} >
                  <Card sx={{ p: 2 }}>
                    <div
                      style={{
                        display: "block",
                        verticalAlign: "middle",
                        position: "relative",
                        border: "1px dotted rgb(128,124,124);",
                      }}
                    >
                      <img
                        alt="not found"
                        style={{
                          width: "100%",
                          maxWidth: "350px",
                          height: "180px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                        src={imageUrl}
                      />

                      <IconButton
                        onClick={imageClear}
                        style={{
                          position: "absolute",
                          top: "-1px",
                          right: "3px",
                          width: "10px",
                          height: "10px",
                        }}
                        aria-label="delete"
                        color="primary"
                      >
                        <CancelIcon />
                      </IconButton>
                    </div>
                  </Card>
                </Grid>
              )}
            </Grid>

            <Grid item xs={12}>
              <Grid container sx={{ pt: 1, paddingLeft: 1, paddingBottom: 1 }} justifyContent={"space-between"}>
                <Grid>
                  <Button variant="contained" color="secondary" size="small" onClick={NavigateToBack}
                    startIcon={<ArrowBackIcon />}>Cancel</Button>
                </Grid>
                <Grid item justifyContent={"flex-end"} sx={{ paddingRight: 2 }}>
                  <Button  type="submit"  variant="contained" sx={{ my: 0 }} startIcon={<SaveIcon />} size="small" >Save</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </div >
  );
}
