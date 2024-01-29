import * as tenantConfig from "src/tenant-orm.config";
import { Connection, createConnection, getConnectionManager } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export function getTenantConnection(tenantId: string): Promise<Connection> {
  const connectionName = `tenant_${tenantId}`;
  const connectionManager = getConnectionManager();
  if (connectionManager.has (connectionName)) {
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(connection.isConnected ? connection : connection.connect());
  }
  return createConnection({
    ...tenantConfig as PostgresConnectionOptions,
    name: connectionName,
    schema: connectionName,
  } );
}