import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button, Divider, Box, CardHeader, IconButton, DialogContentText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteRequest } from '../../Services/httpservice';
import { apiURL } from '../../Constant/ApiUrlConstant';
import axios from 'axios';
import { Delete } from '@mui/icons-material';

interface DeleteProductDialog {
    open: boolean;
    id: string | null;
    onClose: () => void;
    onAddCategory: (categoryName: string) => void;
}


const DeleteProductDialog: React.FC<DeleteProductDialog> = ({ open, id, onClose, }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [categoryDetails, setCategoryDetails] = useState({ categoryName: '', subCategoryName: '' });



    const onDeleteProduct = async (id: any) => {
        if (id) {
            try {
                const response = await deleteRequest(
                    process.env.REACT_APP_API_URL + apiURL.DELETE_PRODUCT_BY_ID + id
                );
                if (response == null)
                    throw new Error(`HTTP error! Status`);
                if (response != null) {
                    const data = response.data;
                    onClose();
                    setIsLoading(false);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setIsLoading(false);
                }
            }
        }
    }
    
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm">
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="8px">
                <CardHeader
                    title="Delete Product"
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
                    Are you sure you want to delete this product?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ marginRight: 2 }}>
                <Button variant="contained" color="secondary" size="small" onClick={onClose}>Cancel</Button>
                <Button variant="contained" sx={{ my: 0 }} onClick={() => onDeleteProduct(id)} startIcon={<Delete />}
                size="small"type="submit">Sure</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DeleteProductDialog;
