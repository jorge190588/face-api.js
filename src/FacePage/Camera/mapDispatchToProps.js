import {actionNames} from 'constants/index';
const mapDispatchToProps = dispatch => ({
    SET_VIDEO_IN_GAME_FACENET: (video)=> 
        dispatch({  "type":actionNames.SET_VIDEO_IN_GAME_FACENET,
                    "state":{"video":video} 
    }), 
});
export default mapDispatchToProps;