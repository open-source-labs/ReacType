import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  styled
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useEffect } from 'react';
import {
  openProject,
  resetAllState
} from '../../redux/reducers/slice/appStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MoreVert } from '@mui/icons-material';
import { RootState } from '../../redux/store';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
// import imageSrc from '../../../../resources/marketplace_images/marketplace_image.png';
import { red } from '@mui/material/colors';
import { saveProject } from '../../helperFunctions/projectGetSaveDel';
import { useHistory } from 'react-router-dom';
import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../../../../src/custom-aws-exports';

interface Project {
  forked: String;
  comments: string[];
  createdAt: Date;
  likes: number;
  name: string;
  project: object;
  published: boolean;
  userId: number;
  username: string;
  _id: number;
}

const ITEM_HEIGHT = 48;
const MarketplaceCard = ({ proj }: { proj: Project }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [s3ImgURL, setS3ImgURL] = React.useState<null | string>(null);
  const open = Boolean(anchorEl);
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const [guest, setGuest] = React.useState<boolean>(null);
  const state = useSelector((store: RootState) => store.appState);


  useEffect(() => {
    async function s3ImgFetch() {
      Amplify.configure(awsconfig);
      try {
        const objId: string = proj._id.toString();
        // the below functions are commented out as not to incur too many charges
        const response: string = await Storage.get(objId);
        // const response: string = await Storage.get('test');
        setS3ImgURL(response);
      } catch (error) {
        console.error(`Error fetching image preview for ${proj._id}: `, error);
      }
    }
    s3ImgFetch();
  }, []);



  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClone = async () => {
    if(state.isLoggedIn){
      // creates a copy of the project
      const docId = proj._id;
      const response = await axios.get(`/cloneProject/${docId}`); //passing in username as a query param is query params
      const project = response.data;
      setAlertOpen(true);
      setAnchorEl(null);
      return {
        _id: project._id,
        name: project.name,
        published: project.published,
        ...project.project
      };
    }
    setGuest(true);
  };

  const handleCloneOpen = async () => {
    if(state.isLoggedIn){
      const project = await handleClone();
      history.push('/');
      dispatch(openProject(project));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
    setAnchorEl(null);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <Card
        sx={{ maxWidth: 384, backgroundColor: '#1E1E1E', borderRadius: '12px' }}
      >
        <CardMedia
          sx={{ borderRadius: '12px', height: 200 }}
          component="img"
          height="194"
          image={s3ImgURL}
          alt="component preview"
        />
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#0bcaa8' }} aria-label="recipe">
              {proj.username.slice(0,1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
          }
          title={proj.name}
          subheader={proj.username}
        />
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button'
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
              backgroundColor: '#1E1E1E'
            }
          }}
        >
          <MenuItem
            onClick={handleClone}
            sx={{
              color: '#fff'
            }}
          >
            Clone
          </MenuItem>
          <MenuItem
            onClick={handleCloneOpen}
            sx={{
              color: '#fff'
            }}
          >
            Clone and open
          </MenuItem>
        </Menu>
        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: '100%', color: 'white' }}
          >
            Project Cloned!
          </Alert>
        </Snackbar>
        <Snackbar
          open={guest}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="error"
            sx={{ width: '100%', color: 'white' }}
          >
            Please login to clone!
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
};

export default MarketplaceCard;
