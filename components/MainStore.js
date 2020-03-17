import React from 'react';
import Cookies from 'js-cookie';


export const AppContext = React.createContext(null);

export class AppState extends React.Component {
  state = {
    annotationsTags: [],
    annotations: [],
    annotationTypesVisibility: {},

    imageTags: [],
    imgData: null,
    imageInfo: [],
    imageList: [],
    validatedImgList: [],
    conflictedImgList: []
  };

  setCurrentImg = (currentImg) => {
    this.setState({
      currentImg: currentImg
    });
  };

  setImageInfo = (imageInfo) => {
    this.setState({
      imageInfo: imageInfo,
    });
  };

  pushCandidate = () => {
    fetch('/api/v1/push_candidate', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        'currentImg': this.state.currentImg,
        'currentAnnotations': this.state.annotations,
        'currentImageInfo': this.state.imageInfo
      })
    }).then((response) => {
      if (response.status === 200) {
        console.log('response OK');
        return response;
      } else {
        throw response;
      }
    }).then(response => response.json())
      .then((data) => {
        this.setState({
          validatedImgList: data.validated_img_list
        });
      })
      .catch(response => response.text()
      ).then((body) => {
        console.log(body);
      });
  };

  submitCandidates = () => {
    fetch('/api/v1/submit_files', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        'image_tags': this.state.imageTags,
        'annotation_tags': this.state.annotationsTags,
      })
    }).then((response) => {
      if (response.status === 200) {
        console.log('response OK');
        return response;
      } else {
        throw response;
      }
    }).then((response) => {
      window.location.replace('/validate');
    }).catch((error) => {

    });
  };

  fetchImageData = (imgId) => {
    fetch('/api/v1/get_raw_image_annotations', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        'current_img': imgId
      })
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('response OK');
          return response;
        } else {
          throw response;
        }
      })
      .then((response) => (response.json()))
      .then((data) => {
        this.setState({
          imgData: data.origin_img,
          annotations: data.annotations,
          imageInfo: data.image_infos
        });
      }).catch(response => response.text())
      .then((body) => {
        console.log(body);
      });
  };

  fetchImageList = () => {
    fetch('/api/v1/get_image_list', {
      method: 'POST',
      credentials: 'include'
    }).then((response) => {
      if (response.status === 200) {
        return response;
      } else {
        console.log(response);
        throw 'bad response';
      }
    }).then((response) => (response.json()))
      .then((data) => {
        this.setState({
          imageList: data.image_list,
          conflictedImgList: data.conflicted_elems,
          validatedImgList: data.validated_elems
        });
        this.fetchImageData(data.image_list[0]);
      }).catch(() => {
        window.location.replace('/upload');
      });
  };

  setImageList = (newList) => {
    this.setState({ imageList: newList });
  };

  submitImageData = () => {
    console.log('submitImageData image data placeholder');
  };

  pushDataset = () => {
    fetch('/api/v1/submit_full_dataset', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        'image_tags': this.state.imageTags,
        'annotation_tags': this.state.annotationsTags,
      })
    }).then((response) => {
      if (response.status === 200) {
        return response;
      } else {
        console.log(response);
        throw 'bad response';
      }
    }).then((response) => {
      window.location.replace('/validate');
    }).catch((error) => {

    });
  };

  syncImageTags = (tags) => {
    this.setState({ imageTags: tags });
  };

  syncAnnotationsTags = (tags) => {
    this.setState({ annotationsTags: tags });
  };

  syncAnnotations = (annotations) => {
    this.setState({ annotations: annotations });
  };

  syncAnnotationsVisibility = (options) => {
    this.setState({ annotationTypesVisibility: options });
  };

  render() {
    return (
      <AppContext.Provider
        value={{

          imageTags: this.state.imageTags,
          imgData: this.state.imgData,
          imageInfo: this.state.imageInfo,
          imageList: this.state.imageList,
          currentImg: this.state.currentImg,

          syncImageTags: this.syncImageTags,
          setImageList: this.setImageList,
          setCurrentImg: this.setCurrentImg,
          setImageInfo: this.setImageInfo,
          fetchImageData: this.fetchImageData,
          fetchImageList: this.fetchImageList,
          submitImageData: this.submitImageData,
          validatedImgList: this.state.validatedImgList,
          conflictedImgList: this.state.conflictedImgList,

          annotations: this.state.annotations,
          annotationsTags: this.state.annotationsTags,
          annotationTypesVisibility: this.state.annotationTypesVisibility,
          syncAnnotations: this.syncAnnotations,
          syncAnnotationsTags: this.syncAnnotationsTags,
          syncAnnotationsVisibility: this.syncAnnotationsVisibility,

          submitCandidates: this.submitCandidates,
          pushCandidate: this.pushCandidate,
          pushDataset: this.pushDataset,

        }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

