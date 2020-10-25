export class ARTHREE {
  constructor(onLoad = () => { }) {
    this.onLoad = onLoad;
    this.init()
  }

  init = () => {
    const { ARnft } = window;
    this.nft = new ARnft(640, 480, '/jsartoolkitNFT/examples/config.json');
    return this.onLoad(this)
  }

  createMesh = (width = 1, height = 1, materialProps = {}) => {
    const { THREE } = window;
    let mat = new THREE.MeshBasicMaterial(materialProps);
    let geom = new THREE.PlaneGeometry(width, height, 8);

    return new THREE.Mesh(geom, mat);
  }

  addMarker = ({ width, height, url }) => {
    this.nft.init("../" + url, true);

    const { THREE } = window;

    width = width / ARTHREE.DEFAULT * ARTHREE.SIZE;
    height = height / ARTHREE.DEFAULT * ARTHREE.SIZE;

    let GROUP = new THREE.Group();

    //video
    let videoTAG = document.getElementById('videoForThree');
    let texture = new THREE.VideoTexture(videoTAG);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;
    const { videoWidth, videoHeight } = videoTAG;
    let _width = 0,
      _height = 0,
      videoDiff = videoWidth / videoHeight,
      markerDiff = width / height;

    if (width === height) {
      if (videoWidth > videoHeight) {
        _width = width;
        _height = width / videoDiff;
      }
      else if (videoWidth < videoHeight) {
        _width = height * videoDiff;
        _height = height;
      }
      else {
        _width = height / videoDiff;
        _height = height;
      }
    }
    else if (width > height) {
      if (videoDiff > markerDiff) {
        if (videoWidth > videoHeight) {
          _width = width;
          _height = width / videoDiff;
        }
        else {
          _width = height / videoDiff;
          _height = height;
        }
      }
      else {
        if (videoWidth < videoHeight) {
          _width = height * videoDiff;
          _height = height;
        }
        else {
          _width = height / videoDiff;
          _height = height;
        }
      }
    }
    else {
      if (videoDiff > markerDiff) {
        if (videoWidth >= videoHeight) {
          _width = width;
          _height = width / videoDiff;
        }
        else {
          _width = height * videoDiff;
          _height = height;
        }
      }
      else {
        if (videoWidth < videoHeight) {
          _width = width;
          _height = width / videoDiff;
        }
        else {
          _width = height / videoDiff;
          _height = height;
        }
      }
    }


    let VIDEO = this.createMesh(_width, _height, { map: texture });
    GROUP.add(VIDEO)

    let diffWidth = width - _width;
    let diffHeight = height - _height;
    let PARAMS = {};
    let FIRST, SECOND;

    if (diffWidth) {
      let bwidth = diffWidth / 2;
      let offset = bwidth / 2 + _width / 2;
      FIRST = this.createMesh(bwidth, height, { color: 0x000000 })
      FIRST.position.x = -offset;
      SECOND = this.createMesh(bwidth, height, { color: 0x000000 })
      SECOND.position.x = offset;
    }
    else if (diffHeight) {
      let bheight = diffHeight / 2;
      let offset = bheight / 2 + _height / 2;
      FIRST = this.createMesh(width, bheight, { color: 0x000000 })
      FIRST.position.y = -offset;
      SECOND = this.createMesh(width, bheight, { color: 0x000000 })
      SECOND.position.y = offset;
    }

    GROUP.add(FIRST)
    GROUP.add(SECOND)

    GROUP.position.x = width / 2;
    GROUP.position.y = height / 2;

    this.nft.add(GROUP);
  }

  remove = () => {
    window.location.reload()
  }

  animate = () => {
    this.arScene.process();
    this.arScene.renderOn(this.renderer);
    requestAnimationFrame(this.animate);
  }
};
ARTHREE.VIDEOTYPES = {
  VERTICAL: 'VERTICAL',
  HORIZONTAL: 'HORIZONTAL',
  RECTANGLE: 'RECTANGLE',
}
ARTHREE.VERTICAL = 'https://scontent-frt3-2.cdninstagram.com/v/t50.2886-16/106147630_310787940325561_487812401535930628_n.mp4?_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=ZdlDuUjJzHsAX__kb3k&oe=5F0AEC06&oh=3cc4df275326056535c686754f19d876';
ARTHREE.HORIZONTAL = './video/skin.mp4';
ARTHREE.RECTANGLE = 'https://scontent-frt3-1.cdninstagram.com/v/t50.2886-16/10350813_771229796339514_685455158_n.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ19wcm9ncmVzc2l2ZV91cmxnZW4ucHJvZHVjdF90eXBlLmZlZWRcIl0ifQ&_nc_ht=scontent-frt3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=3Mv5Rjao0eUAX-_0Gux&oe=5F0AB690&oh=79a6e25776ca017d0371a1c52d3f5163';
ARTHREE.SIZE = 240;
ARTHREE.DEFAULT = 676;

export default ARTHREE;