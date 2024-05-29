import { config } from 'dotenv';
config();

function getOsEnv(key: string): string {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return process.env[key] as string;
}

export const env = {
  azureHost: getOsEnv('azure_host'),
  azurePort: getOsEnv('azure_port'),
  azureDatabase: getOsEnv('azure_database'),
  azureUserName: getOsEnv('azure_username'),
  azurePassword: getOsEnv('azure_password'),
};
