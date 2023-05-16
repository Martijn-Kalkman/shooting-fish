import { ImageSource, Loader } from 'excalibur';
import fishImage from '../images/fish.png';

const Resources = {
  Fish: new ImageSource(fishImage),
};

const ResourceLoader = new Loader([Resources.Fish]);

export { Resources, ResourceLoader };
