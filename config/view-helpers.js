
import environment from './environment.js';
import { readFileSync } from 'fs';
import { join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app)=>{
    app.locals.assetPath = function(filePath){
        if(environment.name == 'development'){
            return filePath;
        }
        return '/'+JSON.parse(readFileSync(join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
    }
}