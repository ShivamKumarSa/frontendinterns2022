import React from 'react';
import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import img from '../../images/pexels-johannes-plenio-1105379.jpg';

const PopupPredefinedCard = ({ cardData }: any) => (
  <Container sx={{ padding: '10px' }}>
    <DialogTitle id="scroll-dialog-title">{cardData.configurationName}</DialogTitle>
    <Divider />
    <DialogContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <img src={img} alt="card iamge" height="300px" width="100%" />
      </Box>

      <DialogContentText id="scroll-dialog-description">
        <Typography gutterBottom variant="h4" component="div">
          Specifications
        </Typography>
        <List sx={{ listStyleType: 'disc', margin: '-5px 20px ' }}>
          <ListItem sx={{ display: 'list-item' }} disablePadding>
            {cardData.processorObj.company} {cardData.processorObj.name}
          </ListItem>
          <ListItem sx={{ display: 'list-item' }} disablePadding>
            {cardData.ramObj.company} {cardData.ramObj.name} {cardData.ramObj.capacity}GB
          </ListItem>
          <ListItem sx={{ display: 'list-item' }} disablePadding>
            {cardData.storageObj.company} {cardData.storageObj.capacity}GB{' '}
            {cardData.storageObj.storageType}
          </ListItem>
        </List>
        {cardData.currDesc}
      </DialogContentText>
    </DialogContent>
    <Divider />
    <DialogActions>
      <NavLink to="/login" style={{ textDecoration: 'none' }}>
        <Button disableElevation variant="contained" color="info" size="large">
          Customize
        </Button>
      </NavLink>
      <NavLink to="/login" style={{ textDecoration: 'none' }}>
        <Button disableElevation variant="contained" color="info" size="large">
          Buy Now
        </Button>
      </NavLink>
    </DialogActions>
  </Container>
);

export default PopupPredefinedCard;
