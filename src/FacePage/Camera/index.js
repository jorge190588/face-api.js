import React, { useState, useEffect } from 'react';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import { useStyles } from "./style";

function ModalVideo(props) { 
    const classes = useStyles();
    const [video,]=useState(React.createRef());
    
    const videoError=(error)=>{
        console.log("error",error);
    }

    const handleVideo=(stream)=>{
        video.current.srcObject = stream;
        props.SET_VIDEO_IN_GAME_FACENET(video);
    }
     
    useEffect(() => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }
    });

    return (
        <video className={classes.root} ref={video} autoPlay={true} onPlay={props.video_handler}/>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalVideo);