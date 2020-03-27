import {actionNames} from 'constants/index';
const mapDispatchToProps = dispatch => ({
    SET_VIDEO_IN_GAME_FACENET: (video)=> 
        dispatch({  "type":actionNames.SET_VIDEO_IN_GAME_FACENET,
                    "state":{"video":video} 
    }), 
    SET_VIDEO_HANDLER_IN_GAME_FACENET: (video_handler)=> 
        dispatch({  "type":actionNames.SET_VIDEO_HANDLER_IN_GAME_FACENET,
                    "state":{"video_handler":video_handler} 
    }), 
    SET_DETECTOR_OPTIONS_IN_GAME_FACENET: (detector_options)=> 
        dispatch({  "type":actionNames.SET_DETECTOR_OPTIONS_IN_GAME_FACENET,
                "state":{"detector_options":detector_options} 
    }), 
    SET_MODEL_IN_GAME_FACENET: (model)=> 
        dispatch({  "type":actionNames.SET_MODEL_IN_GAME_FACENET,
            "state":{"model":model} 
}), 
});
export default mapDispatchToProps;