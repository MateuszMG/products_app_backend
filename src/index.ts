import { config } from './config/config';

import { app } from './app';

app.listen(config.PORT, () => {
  console.log(`Port:${config.PORT} <3`);
});
