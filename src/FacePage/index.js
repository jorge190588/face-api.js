import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect } from "react-redux";
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import Camera from './Camera'; 
import Canva from './Canva'; 
import * as faceapi from 'face-api.js';

class FacePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controller:'game',
            loading: false,
            authorized:false,
            checkAutorization:true,
            positionIndex:0,
        }
        this.setVideoHandler = this.setVideoHandler.bind(this);
        this.isModelLoaded =  this.isModelLoaded.bind(this);
    }
    
    async setVideoHandler(){
        if (this.isModelLoaded()!==undefined){
            try{
                let result= await faceapi.detectSingleFace(this.props.video.current, this.props.detector_options).withFaceLandmarks();

                if (result!==undefined){
                    //console.log("face detected",result);
                    const dims = faceapi.matchDimensions(this.props.canvas.current, this.props.video.current, true);
                    const resizedResult = faceapi.resizeResults(result, dims);
                    faceapi.draw.drawDetections(this.props.canvas.current, resizedResult);
                    faceapi.draw.drawFaceLandmarks(this.props.canvas.current, resizedResult);
                    
                    //ADD CANVAS
                    const currentCanvas = ReactDOM.findDOMNode(this.props.canvas.current);
                    var canvasElement = currentCanvas.getContext("2d");
                    //ctx.lineTo(x,y);
                    //ctx.stroke();
                    canvasElement.fillStyle = 'rgb(255, 87, 51)';
                    //ctx.fillRect(result.alignedRect.box.x, result.alignedRect.box.y, 100, 50);
                    // jaw 0-16  left eyebrow  17-21 right eyebrow  22-26  nose 27-35  left eye 36-41  right eye 42-47 and mouth 48-67
                     
                    canvasElement.fillRect(result.landmarks.positions[this.state.positionIndex].x,
                                 result.landmarks.positions[this.state.positionIndex].y, 
                                 10, 10);
                    canvasElement.closePath();
                }
            }catch(exception){
                console.log(exception);
            }
        }
        setTimeout(() => this.setVideoHandler());
    }

    isModelLoaded(){
        if (this.props.selected_face_detector === this.props.SSD_MOBILENETV1){
            return faceapi.nets.ssdMobilenetv1.params;
        } 
        if (this.props.selected_face_detector === this.props.TINY_FACE_DETECTOR) {
            return faceapi.nets.tinyFaceDetector.params;
        }
    }

    
    async componentDidMount() {
        console.log("height: "+window.screen.height+", width: "+window.screen.width);
        
        this.setDetectorOptions();
        this.props.SET_VIDEO_HANDLER_IN_GAME_FACENET(this.setVideoHandler);
        
        let modelFolder="/models";
        try{
            await faceapi.loadFaceLandmarkModel(modelFolder);
            if (this.props.selected_face_detector === this.props.SSD_MOBILENETV1){
                await faceapi.nets.ssdMobilenetv1.loadFromUri(modelFolder);
            }
                
            if (this.props.selected_face_detector === this.props.TINY_FACE_DETECTOR) {
                await faceapi.nets.tinyFaceDetector.load(modelFolder);
            }
        }catch(exception){
            console.log("exception",exception);
        }        
    }

    setDetectorOptions() {
        let minConfidence = this.props.min_confidence,
            inputSize= this.props.input_size,
            scoreThreshold= this.props.score_threshold;

        let options= this.props.selected_face_detector === this.props.SSD_MOBILENETV1
          ? new faceapi.SsdMobilenetv1Options({ minConfidence })
          : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
        this.props.SET_DETECTOR_OPTIONS_IN_GAME_FACENET(options);
    }
 
    render() {
        return (
            <div>
                <Camera/>
                <Canva/>
                <input type="number" 
                    style={{marginLeft:1000}} 
                    value={this.state.positionIndex} 
                    onChange={(event)=>{this.setState({positionIndex: event.target.value})}}/>            
            </div>            
        )
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(FacePage);