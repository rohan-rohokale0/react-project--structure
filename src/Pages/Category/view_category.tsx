
import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, TextField, Button, Divider, Grid, Box, CardHeader, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getRequest } from '../../Services/httpservice';
import { apiURL } from '../../Constant/ApiUrlConstant';
import axios, { AxiosError } from 'axios';

interface ViewCategoryDialog {
    open: boolean;
    id: string | null;
    onClose: () => void;
    onAddCategory: (categoryName: string) => void;
}


const ViewCategoryDialog: React.FC<ViewCategoryDialog> = ({ open, id, onClose, }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categoryDetails, setCategoryDetails] = useState({ categoryName: '', subCategoryName: '' });

    useEffect(() => {
        if (id) {
            getAllCategoryList(id);
        }
    }, [id]);

    const getAllCategoryList = async (id: any) => {
        setIsLoading(true);
        try {
            const response = await getRequest(
                process.env.REACT_APP_API_URL + apiURL.GET_CATEGORY_BY_ID + id
            );
            if (response == null)
                throw new Error(`HTTP error! Status`);
            if (response != null) {
                const data = response.data;
                setCategoryDetails(data);
                setIsLoading(false);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsLoading(false);
            }
        }
    }
    return (

        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="8px">
                <CardHeader
                    title="View Category"
                    titleTypographyProps={{ variant: 'h6' }}
                    style={{ padding: 0 }}
                />
                <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 1, top: 2 }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <DialogContent>
                <Grid container direction="row" spacing={2} columns={{ xs: 4, md: 12 }}>
                    <Grid item xs={6}>
                        <TextField
                            label="Category Name"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={categoryDetails.categoryName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="SubCategory Name"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={categoryDetails.subCategoryName}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ marginRight: 2 }}>
                <Button variant="contained" color="secondary" size="small" onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
export default ViewCategoryDialog;
