import {actionNames} from 'constants/index';
const actions = {};

actions.SET_VIDEO_IN_GAME_FACENET =(state)=>{
    return { type:actionNames.SET_VIDEO_IN_GAME_FACENET, state};
}  
actions.SET_VIDEO_HANDLER_IN_GAME_FACENET =(state)=>{
    return { type:actionNames.SET_VIDEO_HANDLER_IN_GAME_FACENET, state};
}  
actions.SET_DETECTOR_OPTIONS_IN_GAME_FACENET=(state)=>{
    return { type:actionNames.SET_DETECTOR_OPTIONS_IN_GAME_FACENET, state};
}  
actions.SET_MODEL_IN_GAME_FACENET=(state)=>{
    return { type:actionNames.SET_MODEL_IN_GAME_FACENET, state};
}  
actions.SET_CANVAS_IN_GAME_FACENET=(state)=>{
    return { type:actionNames.SET_CANVAS_IN_GAME_FACENET, state};
}  
export default actions;


