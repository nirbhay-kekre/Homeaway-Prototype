import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './postProperty.css';
import { updatePhotosAction } from '../../actions/postPropertyAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const maxSize = 5 * 1024 *1024;
const acceptedType = "image/jpeg, image/png";

class PostPropertyPhotos extends Component {

    constructor(props){
        super(props);
        this.state ={
            propertyPhoto: this.props.photos.propertyPhoto,
            previewPhotos: this.props.previewPhotos,
            error: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.photoChangeHandler = this.photoChangeHandler.bind(this);
        this.readFile = this.readFile.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updatePhotosAction({
            propertyPhoto: this.state.propertyPhoto,
            previewPhotos: this.state.previewPhotos
        },"amenities");
    }

    backHandler = (e) => {
        e.preventDefault();
         this.props.updatePhotosAction({
            propertyPhoto: this.state.propertyPhoto,
            previewPhotos: this.state.previewPhotos
        }, "bookingOptions");
    }

    photoChangeHandler = async (e) => {
        let previewUrls = this.state.previewPhotos.slice();
        let propertyPhoto = this.state.propertyPhoto.slice();
        if ((this.state.propertyPhoto.length + e.propertyPhoto.length) < 6) {
            for (let i = 0; i < e.propertyPhoto.length; i++) {
                const fileUrl = await this.readFile(e.propertyPhoto[i]);
                previewUrls.push(fileUrl);
                propertyPhoto.push(e.propertyPhoto[i]);
            }
            this.setState({
                previewPhotos: previewUrls,
                propertyPhoto
            })
        } else {
            this.setState({
                error: "Maximum 5 photos can be uploaded"
            })
        }
    }

    readFile = (file) => {
        let fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                reject("Error occoured");
            }
            fileReader.onloadend = () => {
                resolve(fileReader.result);
            }
            fileReader.readAsDataURL(file);
        })
    }

    handleOnDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            if (!acceptedType.includes(rejectedFiles[0].type)) {
                alert("only jpeg and png files are allowed")
            } else if (maxSize < rejectedFiles[0].size) {
                alert("File size is too large");
            }
        } else if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles.length < 6) {
            this.photoChangeHandler({
                propertyPhoto: acceptedFiles
            })
        }
    }
    render() {
        let errorMessage = null;
        if (this.state.error) {
            errorMessage = <div className="alert alert-danger alert-dismissible row m-2" role="alert">
                <div className="col-1"><i className="material-icons">warning</i></div>
                <div className="col-11">
                    {this.state.error}
                </div>
                <div><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        }
        return (
            <div className="m-4">
                {errorMessage}
                <h4 className="text-left m-4 border-bottom w-100">Add up to 5 photos of your property</h4>
                <p className="mx-4 text-muted">Showcase your property’s best features (no pets or people, please). Requirements: JPEG or PNG, less than 5MB file size, 2 photos minimum</p>
                <form onSubmit={this.handleSubmit} className="m-2">
                    <Dropzone 
                        onDrop={this.handleOnDrop}
                        maxSize={maxSize}
                        accept={acceptedType}
                        className="w-100 text-center my-4 dropZone"
                    >
                        <h1 className="text-muted">Drop photos here</h1><br />
                        <p>or</p><br />
                        <h1 className="text-muted">Click to upload files</h1>
                    </Dropzone>
                    <div className="row">
                        {(this.state.previewPhotos && this.state.previewPhotos.length > 0) ?
                            this.state.previewPhotos.map(image => {
                                return (
                                    <div className="col-4 my-2" style={{height:"150px"}}>
                                        <img src={image} className="auto-fit" alt="propertyPhoto" />
                                    </div>)
                            }
                            )
                            : ""
                        }
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-light p-3 m-1" type="button" style={{minWidth:"150px"}} onClick={this.backHandler}>Back</button>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <button className="btn btn-primary search-button p-3 m-1" style={{minWidth:"150px"}} type="submit">Next</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    photos: state.postPropertyReducer.photos,
    previewPhotos: state.postPropertyReducer.previewPhotos
})

PostPropertyPhotos.propTypes = {
    photos: PropTypes.object.isRequired,
    previewPhotos:PropTypes.array.isRequired
}

export default connect(mapStateToProps, { updatePhotosAction })(PostPropertyPhotos);