import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';

//import 'react-image-crop/dist/ReactCrop.css';
import './custom-image-crop.css';

import {
  base64StringtoFile,
  //downloadBase64File,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef
} from './ImageUtils';

const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes =
  'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => {
  return item.trim();
});

class ImgDropAndCrop extends Component {
  constructor(props) {
    super(props);
    this.imagePreviewCanvasRef = React.createRef();
    this.fileInputRef = React.createRef();
    this.state = {
      showCroppingIcon: false,
      showCropped: false,
      cropping: false,
      imgDisplay: null,
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 1 / 1
      }
    };
  }

  componentDidMount() {
    this.setState({
      imgDisplay: this.props.image
    });
  }

  verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert(
          'This file is not allowed. ' + currentFileSize + ' bytes is too large'
        );
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert('This file is not allowed. Only images are allowed.');
        return false;
      }
      return true;
    }
  };

  //----------------------------------------- DropZone Functions
  handleFileSelect = event => {
    // console.log(event)
    const files = event.target.files;
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          'load',
          () => {
            // console.log(myFileItemReader.result)
            const myResult = myFileItemReader.result;
            this.setState({
              imgSrc: myResult,
              imgSrcExt: extractImageFileExtensionFromBase64(myResult)
            });
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
    this.setState({
      showCroppingIcon: true
    });
  };

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }

    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          'load',
          () => {
            // console.log(myFileItemReader.result)
            const myResult = myFileItemReader.result;
            this.setState({
              imgSrc: myResult,
              imgDisplay: myResult,
              imgSrcExt: extractImageFileExtensionFromBase64(myResult)
            });
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
    this.setState({
      showCroppingIcon: true
    });
  };

  //-----------------------------------------------ReactCrop Functions
  handleImageLoaded = image => {
    console.log(image);
    const { imgSrcExt } = this.state;
    console.log(imgSrcExt);
    const fileName = this.props.nameImage + '.' + imgSrcExt;
    const submitableFile = base64StringtoFile(image.src, fileName);
    console.log(submitableFile);
    this.setState({
      uploadFile: submitableFile
    });
  };

  handleOnCropChange = crop => {
    this.setState({ crop: crop });
  };

  handleOnCropComplete = (crop, pixelCrop) => {
    //console.log(crop, pixelCrop)

    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgDisplay } = this.state;
    image64toCanvasRef(canvasRef, imgDisplay, pixelCrop);
    this.setState({
      cropping: true
    });
  };

  handleCropClick = event => {
    event.preventDefault();
    const { imgDisplay } = this.state;
    if (imgDisplay) {
      const canvasRef = this.imagePreviewCanvasRef.current;

      const { imgSrcExt } = this.state;
      const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt);

      const myFilename = this.props.nameImage + '.' + imgSrcExt;

      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      console.log(myNewCroppedFile);
      // download file
      // downloadBase64File(imageData64, myFilename);
      // Save crop
      this.setState({
        showCropped: true,
        imgDisplay: imageData64,
        uploadFile: myNewCroppedFile
      });
      //this.handleClearToDefault();
    }
  };

  handleResetClick = event => {
    event.preventDefault();

    const { imgSrc, imgSrcExt } = this.state;
    console.log(imgSrcExt);
    const fileName = this.props.imageName + '.' + imgSrcExt;
    const submitableFile = base64StringtoFile(imgSrc, fileName);
    console.log(submitableFile);
    this.setState({
      cropping: false,
      showCropped: false,
      imgDisplay: imgSrc,
      uploadFile: submitableFile
    });
  };

  handleOkClick = event => {
    event.preventDefault();

    const { uploadFile } = this.state;
    this.props.onImageUpload(uploadFile);
  };

  render() {
    const { imgDisplay } = this.state;
    return (
      <div>
        <div
          class="modal fade"
          id="uploadModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Select Your Profile Photo
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="mx-auto">
                    <Dropzone
                      className="col-md-6 text-center mx-auto border"
                      style={{
                        padding: '20px',
                        paddingTop: '30px'
                      }}
                      onDrop={this.handleOnDrop}
                      accept={acceptedFileTypes}
                      multiple={false}
                      maxSize={imageMaxSize}
                    >
                      Drop image here or click to upload
                    </Dropzone>
                  </div>
                </div>
                <hr />
                <div>
                  {!this.state.showCroppingIcon ? (
                    <div
                      className="col-md-10 mx-auto"
                      style={{ width: '250px' }}
                    >
                      <img src={imgDisplay ? imgDisplay : this.props.image} />
                    </div>
                  ) : (
                    <div>
                      {this.state.showCropped ? (
                        <div />
                      ) : (
                        <div>
                          <div className="text-muted">Uploaded Image</div>
                          <div className="col-md-10 mx-auto">
                            <ReactCrop
                              src={imgDisplay}
                              crop={this.state.crop}
                              onImageLoaded={this.handleImageLoaded}
                              onComplete={this.handleOnCropComplete}
                              onChange={this.handleOnCropChange}
                            />
                          </div>
                          <hr />
                        </div>
                      )}
                      <div className="text-muted">Preview</div>
                      <div className="row mx-auto">
                        <div className="col-md-6 mx-auto">
                          <canvas
                            ref={this.imagePreviewCanvasRef}
                            className="mx-auto text-center"
                            style={{ width: '250px' }}
                          />
                        </div>
                      </div>
                      <hr />
                      {this.state.cropping ? (
                        <div className="mx-auto button-group" role="group">
                          <button
                            className="col-md-6 mx-auto btn btn-info"
                            onClick={this.handleResetClick}
                          >
                            Reset
                          </button>
                          <button
                            className="col-md-6 mx-auto btn btn-info"
                            onClick={this.handleCropClick}
                          >
                            Crop
                          </button>
                        </div>
                      ) : (
                        <div className="mx-auto button-group" role="group">
                          <button
                            className="col-md-6 mx-auto btn btn-light"
                            disabled
                          >
                            Reset
                          </button>
                          <button
                            className="col-md-6 mx-auto btn btn-light"
                            disabled
                          >
                            Crop
                          </button>
                        </div>
                      )}
                      <hr />
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleOkClick}
                  data-dismiss="modal"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImgDropAndCrop;
