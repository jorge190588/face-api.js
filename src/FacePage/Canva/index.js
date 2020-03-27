import React, { useState, useEffect } from 'react';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import { useStyles } from "./style";

function CanvaElement(props) { 
    const classes = useStyles();
    const [canvas,]=useState(React.createRef());
    
    useEffect(() => {
        props.SET_CANVAS_IN_GAME_FACENET(canvas);
    });

    return (
        <canvas className={classes.canva} ref={canvas} />
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvaElement);