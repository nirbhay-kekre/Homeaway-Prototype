import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import './postProperty.css'
const maxSize = 5 * 1024 *1024;
const acceptedType = "image/jpeg, image/png";
class PostPropertyPhotos extends Component {


    handleOnDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            if (!acceptedType.includes(rejectedFiles[0].type)) {
                alert("only jpeg and png files are allowed")
            } else if (maxSize < rejectedFiles[0].size) {
                alert("File size is too large");
            }
        } else if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles.length < 6) {
            this.props.stateChangeHandler({
                propertyPhoto: acceptedFiles
            })
        }
    }
    render() {
        return (
            <div className="m-4">
                <h4 className="text-left m-4 border-bottom w-100">Add up to 5 photos of your property</h4>
                <p className="mx-4 text-muted">Showcase your property’s best features (no pets or people, please). Requirements: JPEG or PNG, less than 5MB file size, 2 photos minimum</p>
                <form onSubmit={this.props.submitPhoto} className="m-2">
                    <Dropzone 
                        onDrop={this.handleOnDrop}
                        maxSize={maxSize}
                        accept={acceptedType}
                        className="w-100 text-center my-4 dropZone"
                    >
                        <h1 className="text-muted">Drop photos here</h1><br />
                        <p>or</p><br />
                        <h1 classNamew="text-muted">Click to upload files</h1>
                    </Dropzone>
                    <div className="row">
                        {(this.props.uploadedImages && this.props.uploadedImages.length > 0) ?
                            this.props.uploadedImages.map(image => {
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
                            <button className="btn btn-light p-3 m-1" type="button" style={{minWidth:"150px"}} onClick={this.props.backHandler}>Back</button>
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

export default PostPropertyPhotos;