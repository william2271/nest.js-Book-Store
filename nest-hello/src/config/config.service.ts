import { parse} from 'dotenv';
import * as fs from 'fs';
import { Configuration } from './config.keys';
export class ConfigService{
    private readonly envConfig: {[key: string]: string};


constructor(){
    const isDevelopmentEnv = process.env.NODE_ENV !== "production";
    if(isDevelopmentEnv){
      const envFilePath =__dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);
      if(!existsPath){
          console.log('.env file does not exist');
          process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
      
    }else{
        this.envConfig = {
            PORT:process.env.PORT,
        };
    }
}
get(key: string): string {
  return this.envConfig[key];
}
}