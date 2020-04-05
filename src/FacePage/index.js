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
                let result= await faceapi.detectSingleFace(this.props.video.current, this.props.detector_options).withFaceLandmarks().withFaceExpressions().withAgeAndGender();
                if (result!==undefined){
                    console.log("face detected",result);
                    const dims = faceapi.matchDimensions(this.props.canvas.current, this.props.video.current, true);
                    const resizedResult = faceapi.resizeResults(result, dims);
                    faceapi.draw.drawDetections(this.props.canvas.current, resizedResult);
                    faceapi.draw.drawFaceLandmarks(this.props.canvas.current, resizedResult);
                    
                    const currentCanvas = ReactDOM.findDOMNode(this.props.canvas.current);
                    var canvasElement = currentCanvas.getContext("2d");
                    this.addBoxIndexOfLandmark(canvasElement, result);
                    this.addBackgroundInformation(canvasElement,result);
                    this.addGenderAndAgeInformation(canvasElement,result);
                    this.addEmotionInformation(canvasElement,resizedResult, result);

                }
            }catch(exception){
                console.log(exception);
            }
        }
        setTimeout(() => this.setVideoHandler());
    }

    addBoxIndexOfLandmark(canvasElement,result){
        canvasElement.fillStyle = 'rgb(255, 87, 51)'; 
        canvasElement.fillRect(result.landmarks.positions[this.state.positionIndex].x,
                        result.landmarks.positions[this.state.positionIndex].y, 
                        10, 10);
        canvasElement.closePath();
    }
    
    addBackgroundInformation(canvasElement,result){
        let positionX=result.landmarks.positions[8].x,
            positionY=result.landmarks.positions[8].y+10;
        canvasElement.fillStyle = "black";
        canvasElement.fillRect(positionX-45, positionY-12, 90, 45);
    }

    addGenderAndAgeInformation(canvasElement,result ){
        // Edad y Sexo
        canvasElement.font = "10px Comic Sans MS";
        //canvasElement.font="30px Arial";
        canvasElement.fillStyle = "red";
        let positionX=result.landmarks.positions[8].x,
            positionY=result.landmarks.positions[8].y+10,
            gender=(result.gender)==="male" ? "Hombre" :"Mujer",
            age="Edad: "+result.age.toFixed();
        gender="Sexo: "+gender;
    
        canvasElement.textAlign = "center";
        canvasElement.fillStyle = "white";
        canvasElement.fillText( gender, positionX,positionY );
        canvasElement.fillText(age,positionX,positionY+15 );
    }

    addEmotionInformation(canvasElement, resizedResult, result){
        const expressions = resizedResult.expressions;
        const maxValue = Math.max(...Object.values(expressions));
        let emotion = Object.keys(expressions).filter(
            item => expressions[item] === maxValue
            );
        emotion=emotion[0];
        emotion= (emotion==="happy") ? "feliz": emotion;
        emotion= (emotion==="neutral") ? "neutral": emotion;
        emotion= (emotion==="angry") ? "enojado": emotion;
        emotion= (emotion==="sad") ? "triste": emotion;
        emotion= (emotion==="surprised") ? "sorprendido": emotion;
        emotion= (emotion==="fearful") ? "temeroso": emotion;

        let positionX=result.landmarks.positions[8].x,
        positionY=result.landmarks.positions[8].y+10;
        canvasElement.fillText( "Emocion: "+emotion, positionX,positionY+30 );
    }
    
    isModelLoaded(){
        if (this.props.selected_face_detector === this.props.SSD_MOBILENETV1)       return faceapi.nets.ssdMobilenetv1.params;
        if (this.props.selected_face_detector === this.props.TINY_FACE_DETECTOR)    return faceapi.nets.tinyFaceDetector.params;
    }

    
    async componentDidMount() {
        console.log("height: "+window.screen.height+", width: "+window.screen.width);
        
        // obtener parametros de configuracion y asignar el modelo que vamos a usar para reconocer rostros
        this.setDetectorOptions();
        
        this.props.SET_VIDEO_HANDLER_IN_GAME_FACENET(this.setVideoHandler);
        
        // asignar los archivos del model a face-api
        let modelFolder="/models";
        try{
            await faceapi.loadFaceLandmarkModel(modelFolder);
            await faceapi.nets.ageGenderNet.loadFromUri(modelFolder);
            await faceapi.nets.faceExpressionNet.loadFromUri(modelFolder);
            if (this.props.selected_face_detector === this.props.SSD_MOBILENETV1)       await faceapi.nets.ssdMobilenetv1.loadFromUri(modelFolder);    
            if (this.props.selected_face_detector === this.props.TINY_FACE_DETECTOR)    await faceapi.nets.tinyFaceDetector.load(modelFolder);
        }catch(exception){
            console.log("exception",exception);
        }        
    }

    setDetectorOptions() {
        let minConfidence = this.props.min_confidence,
            inputSize= this.props.input_size,
            scoreThreshold= this.props.score_threshold;

        // identificar el modelo previsamente entrenado para reconocer rostos.
        // el modelo por defecto es tiny_face_detector
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