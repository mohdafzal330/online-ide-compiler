import { environment } from 'src/environments/environment';

export const baseApiRootUrl = environment.production
  ? 'http://thecodeplanet.in/api'
  : 'https://localhost:44356/';
