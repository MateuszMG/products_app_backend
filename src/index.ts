import { app } from './app';
import { config } from './config/config';

app.listen(config.PORT, () => {
  console.log(`Port:${config.PORT} <3`);
});
