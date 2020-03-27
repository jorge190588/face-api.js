const mapStateToProps = state =>({
    video: state.gameFacenet.video,
    video_handler: state.gameFacenet.video_handler,
    SSD_MOBILENETV1: state.gameFacenet.SSD_MOBILENETV1,
    TINY_FACE_DETECTOR: state.gameFacenet.TINY_FACE_DETECTOR,
    selected_face_detector: state.gameFacenet.selected_face_detector,
    detector_options: state.gameFacenet.detector_options,
    min_confidence:state.gameFacenet.min_confidence,
    input_size: state.gameFacenet.input_size,
    score_threshold: state.gameFacenet.score_threshold,
    canvas: state.gameFacenet.canvas,
});
export default mapStateToProps;
