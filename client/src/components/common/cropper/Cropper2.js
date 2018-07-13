import React, { Component, createRef } from 'react';
import ReactCrop from 'react-image-crop';
import domtoimage from 'dom-to-image';

import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
  downloadBase64File,
  image64toCanvasRef
} from '../ImageUtils';

import 'react-image-crop/dist/ReactCrop.css';

export default class Cropper extends Component {
  constructor(props) {
    super(props);

    this.canvasPreviewRef = createRef();

    this.state = {
      initial: null,
      crop: {
        aspect: this.props.aspectRatio
      },
      cropped: null
    };
  }

  componentDidMount() {
    // var baseImage = new Image();
    // baseImage.setAttribute('crossOrigin', 'anonymous');
    // baseImage.src = this.props.image;
    // console.log(this.props.image);

    // var canvasRef = this.canvasPreviewRef.current;
    // canvasRef.height = baseImage.height;
    // canvasRef.width = baseImage.width;

    // var ctx = canvasRef.getContext('2d');
    // ctx.drawImage(baseImage, 0, 0);
    // var dataURL = canvasRef.toDataURL('image/png');

    // var imageURL = baseImage.toDataURL();

    this.setState({
      // sourceURL: dataURL,
      cropped: this.props.image
    });
  }

  handleImageLoaded = image => {
    // console.log(image);
  };

  handleOnCropChange = crop => {
    this.setState({
      crop
    });
  };

  handleOnCropComplete = (crop, pixelCrop) => {
    // console.log(this.state.sourceURL);
    // console.log(this.state.cropped);
    console.log(crop, pixelCrop);

    const canvasRef = this.canvasPreviewRef.current;

    var croppedImageURL = image64toCanvasRef(
      canvasRef,
      this.props.image,
      pixelCrop
    );

    // console.log(croppedImageURL);

    // const x = pixelCrop.x;
    // const y = pixelCrop.y;

    // var ctx = canvasRef.getContext('2d');
    // canvasRef.height = pixelCrop.height;
    // canvasRef.width = pixelCrop.width;
    // var img = new Image();
    // img.onload = function() {
    //   ctx.drawImage(img, x, y);
    //   console.log(canvasRef.toDataURL());
    // };

    // img.src = this.props.image;
    // var URL = canvasRef.toDataURL();
    // console.log(URL);
    // const canvasElement = document.getElementById('myCanvas');
    //   domtoimage
    //     .toJpeg(document.getElementById('myCanvas'), { quality: 0.95 })
    //     .then(function(dataUrl) {
    //       var link = document.createElement('a');
    //       link.download = 'my-image-name.jpeg';
    //       link.href = dataUrl;
    //       console.log(link.href);
    //       // this.setState({
    //       //   cropped: link.href
    //       // });
    //       link.click();
    //     });

    //   // const croppedFile = base64StringtoFile(croppedImage, this.props.uid);
  };

  // // dataURLtoFile(dataurl, filename) {
  // //   var arr = dataurl.split(','),
  // //     mime = arr[0].match(/:(.*?);/)[1],
  // //     bstr = atob(arr[1]),
  // //     n = bstr.length,
  // //     u8arr = new Uint8Array(n);
  // //   while (n--) {
  // //     u8arr[n] = bstr.charCodeAt(n);
  // //   }
  // //   return new File([u8arr], filename, { type: mime });
  // // }

  // changeCropingImage() {
  //   var file = this.state.cropped;
  //   this.props.onCropChange(file);
  // }

  // saveCropingImage() {
  //   this.props.onCropSave();
  // }

  handleDownloadClick(e) {
    e.preventDefault();

    var sourceImg = this.props.image;
    //var cropped = this.state.cropped;
    //console.log(cropped);
    var fileExtension = 'png';
    //extractImageFileExtensionFromBase64();
    var fileName = this.props.uid + '.' + fileExtension;
    console.log(fileName);
    // file to be uploaded
    var newCroppedFile = base64StringtoFile(sourceImg, fileName);
    console.log(newCroppedFile);
    // downloadFile
    downloadBase64File(sourceImg, newCroppedFile);
  }

  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="cropperModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Crop Image
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
                <ReactCrop
                  id="Image"
                  src={this.props.image}
                  crop={this.state.crop}
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.handleOnCropComplete}
                  onChange={this.handleOnCropChange}
                />
                <hr />

                <div className="text-muted">Preview</div>
                <div className="col-md-12 mx-auto">
                  <canvas
                    ref={this.canvasPreviewRef}
                    className="text-center"
                    img={this.state.crop}
                    id="myCanvas"
                    style={{ width: '300px' }}
                  >
                    {' '}
                  </canvas>
                </div>
                <hr />
                <div
                  className="btn btn-dark float-right"
                  //onClick={this.changeCropingImage.bind(this)}
                >
                  Crop
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleDownloadClick.bind(this)}
                >
                  Download
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  // onClick={this.saveCropingImage.bind(this)}
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
