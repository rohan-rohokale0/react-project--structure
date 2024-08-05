
import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, TextField, Button, Divider, Grid, Box, CardHeader, IconButton, DialogContentText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteRequest, getRequest } from '../../Services/httpservice';
import { apiURL } from '../../Constant/ApiUrlConstant';
import axios, { AxiosError } from 'axios';
import { Delete, SaveOutlined } from '@mui/icons-material';

interface DeleteCategoryDialog {
    open: boolean;
    id: string | null;
    onClose: () => void;
    onAddCategory: (categoryName: string) => void;
}


const DeleteCategoryDialog: React.FC<DeleteCategoryDialog> = ({ open, id, onClose, }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categoryDetails, setCategoryDetails] = useState({ categoryName: '', subCategoryName: '' });



    const onDeleteCategory = async (id: any) => {
        if (id) {

            try {
                const response = await deleteRequest(
                    process.env.REACT_APP_API_URL + apiURL.DELETE_CATEGORY_BY_ID + id
                );
                if (response == null)
                    throw new Error(`HTTP error! Status`);
                if (response != null) {
                    const data = response.data;
                    onClose();
                    // setCategoryDetails(data);
                    setIsLoading(false);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setIsLoading(false);
                }
            }
        }
    }
    
    useEffect(() => {
        getAllCategoryList(id);
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
                    title="Delete Category"
                    titleTypographyProps={{ variant: 'h6' }}
                    style={{ padding: 0 }}
                />
                <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 1, top: 2 }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this category?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ marginRight: 2 }}>
                <Button variant="contained" color="secondary" size="small" onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    sx={{ my: 0 }}

                    onClick={() => onDeleteCategory(id)}

                    startIcon={<Delete />}
                    size="small"
                    type="submit" // Ensure this is a submit button
                >
                    Sure
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DeleteCategoryDialog;
