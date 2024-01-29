import { getTenantConnection } from './tenancy.utils';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Scope } from '@nestjs/common';

export const CONNECTION = "CONNECTION";
export const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: (request: Request) => {
    const { tenantId } = request;
    if (tenantId) {
      return getTenantConnection(tenantId);
   }
    return null;
 },
  inject: [REQUEST],
};