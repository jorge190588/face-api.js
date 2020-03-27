import {actionNames} from 'constants/index';
const mapDispatchToProps = dispatch => ({
    SET_CANVAS_IN_GAME_FACENET: (canvas)=> 
        dispatch({  "type":actionNames.SET_CANVAS_IN_GAME_FACENET,
                    "state":{"canvas":canvas} 
    }), 
});
export default mapDispatchToProps;