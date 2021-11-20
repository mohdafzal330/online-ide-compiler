import { environment } from 'src/environments/environment';

export const baseApiRootUrl = environment.production
  ? 'http://api.thecodeplanet.in/'
  : 'https://localhost:44356/';
