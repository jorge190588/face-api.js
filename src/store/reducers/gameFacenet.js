const initialState= {   video:null,
                        video_handler:null,
                        SSD_MOBILENETV1: 'ssd_mobilenetv1',
                        TINY_FACE_DETECTOR: 'tiny_face_detector',
                        selected_face_detector:'tiny_face_detector',
                        detector_options: null,
                        min_confidence: 0.5,// ssd_mobilenetv1 options
                        input_size: 512,
                        score_threshold :0.5,// tiny_face_detector options
                        canvas:null,
                    };

const reducer = (state = initialState, action )=>{
    switch(action.type){
        case "SET_VIDEO_IN_GAME_FACENET":
            var stateVideo = Object.assign({}, state);
            stateVideo.video=action.state.video;
            return stateVideo;
        case "SET_VIDEO_HANDLER_IN_GAME_FACENET":
            var stateVideoHandler = Object.assign({}, state);
            stateVideoHandler.video_handler=action.state.video_handler;
            return stateVideoHandler;
        case "SET_DETECTOR_OPTIONS_IN_GAME_FACENET":
            var stateDetectorOptions = Object.assign({}, state);
            stateDetectorOptions.detector_options=action.state.detector_options;
            return stateDetectorOptions;
        case "SET_MODEL_IN_GAME_FACENET":
            var stateModel = Object.assign({}, state);
            stateModel.model=action.state.model;
            return stateModel;
        case "SET_CANVAS_IN_GAME_FACENET":
            var stateCanvas = Object.assign({}, state);
            stateCanvas.canvas=action.state.canvas;
            return stateCanvas;
        default:
            return state;
    }
}

export default reducer;