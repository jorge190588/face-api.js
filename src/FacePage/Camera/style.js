import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    root:{
        //position: 'absolute',
        position: 'fixed', 
        right: 0,
        bottom: 0,
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        zIndex: '-100',
        backgroundSize: 'cover'
    }
}));

