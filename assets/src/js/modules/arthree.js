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
    let imageTAG = document.getElementById('videoForThree');
    let texture = new THREE.TextureLoader().load(imageTAG.src);
    
    let IMAGE = this.createMesh(width, height, { map: texture });
    GROUP.add(IMAGE)

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

ARTHREE.SIZE = 240;
ARTHREE.DEFAULT = 676;

export default ARTHREE;