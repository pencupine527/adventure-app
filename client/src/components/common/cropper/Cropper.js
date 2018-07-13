import React, { Component, CreateRef } from 'react';
import ReactCrop from 'react-image-crop';

import { base64StringtoFile } from '../photoUpload/ImageUtils';

import 'react-image-crop/dist/ReactCrop.css';

export default class Cropper extends Component {
  constructor(props) {
    super(props);

    // this.canvasPreviewRef=CreateRef()

    this.state = {
      crop: {
        aspect: this.props.aspectRatio
      },
      cropped: ''
    };
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
    console.log(this.state.imgSrc);
    console.log(crop, pixelCrop);

    const x = pixelCrop.x;
    const y = pixelCrop.y;
    const height = pixelCrop.height;
    const width = pixelCrop.width;

    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');
    var img = new Image();
    c.height = height;
    c.width = width;
    img.onload = function() {
      ctx.drawImage(img, -x, -y);
    };
    img.src = this.props.image;

    console.log();

    var croppedImage = c.toDataURL();
    const croppedFile = base64StringtoFile(croppedImage, this.props.uid);
    this.setState({
      cropped: croppedFile
    });
  };

  // dataURLtoFile(dataurl, filename) {
  //   var arr = dataurl.split(','),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, { type: mime });
  // }

  changeCropingImage() {
    var file = this.state.cropped;
    this.props.onCropChange(file);
  }

  saveCropingImage() {
    this.props.onCropSave();
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
                    className="text-center"
                    img={this.state.crop}
                    id="myCanvas"
                    style={{ width: '300px' }}
                  >
                    {' '}
                  </canvas>
                  <img src={this.state.cropped} alt="to be submitted image" />
                </div>
                <hr />
                <div
                  className="btn btn-dark float-right"
                  onClick={this.changeCropingImage.bind(this)}
                >
                  Crop
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
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.saveCropingImage.bind(this)}
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
