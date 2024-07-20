import { IConfig } from './interface/config.interface';

export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10 || 3000),
});
