import React, { Component } from 'react';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

class ImageView extends Component {
  constructor() {
    super();

    this.state = {
      visible: false
    };
  }

  render() {
    const imageURL = this.props.imageURL;

    return (
      <div>
        <div /*className={this.props.classnameEdits}*/>
          <img
            src={imageURL}
            style={this.props.imageStyle}
            onClick={() => {
              this.setState({ visible: !this.state.visible });
            }}
          />
        </div>
        <Viewer
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
          images={[{ src: imageURL, alt: 'Image' }]}
        />
      </div>
    );
  }
}

export default ImageView;
