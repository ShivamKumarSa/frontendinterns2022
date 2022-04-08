import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { NavLink } from 'react-router-dom';
import img from '../../images/pexels-johannes-plenio-1105379.jpg';
import PopupPredefinedCard from './PopupPredefinedCard';

const PredefinedCard = ({ item }: any) => {
  const [openCardPopUp, setOpenCardPopUp] = useState(false);

  const handleClickCardPopUpOpen = () => {
    setOpenCardPopUp(true);
  };

  const handleCardPopUpClose = () => {
    setOpenCardPopUp(false);
  };
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" height="150" image={img} alt="card image" />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {item.configurationName}
          </Typography>
          <List sx={{ listStyleType: 'disc', marginLeft: '15px', marginTop: '-10px' }}>
            <ListItem sx={{ display: 'list-item' }} disablePadding>
              {item.processorObj.company} {item.processorObj.name}
            </ListItem>
            <ListItem sx={{ display: 'list-item' }} disablePadding>
              {item.ramObj.company} {item.ramObj.name} {item.ramObj.capacity}GB
            </ListItem>
            <ListItem sx={{ display: 'list-item' }} disablePadding>
              {item.storageObj.company} {item.storageObj.capacity}GB {item.storageObj.storageType}
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={handleClickCardPopUpOpen}
          sx={{ marginTop: '-45px', marginLeft: '18px', fontSize: '10px' }}
        >
          Read more...
        </Button>
        <Dialog
          maxWidth="md"
          scroll="paper"
          open={openCardPopUp}
          onClose={handleCardPopUpClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <PopupPredefinedCard cardData={item} />
          <IconButton
            aria-label="close"
            onClick={handleCardPopUpClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </Dialog>
      </CardActions>
      <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '-10px 20px 10px' }}>
        <NavLink to="/login" style={{ textDecoration: 'none' }}>
          <Button disableElevation variant="contained" color="info" size="small">
            Customize
          </Button>
        </NavLink>
        <NavLink to="/login" style={{ textDecoration: 'none' }}>
          <Button disableElevation variant="contained" color="info" size="small">
            Buy Now
          </Button>
        </NavLink>
      </Box>
    </Card>
  );
};

export default PredefinedCard;
