import type { ResponseStructure } from '$/apis/utils';

export type HealthCheckRequest = undefined;
export type HealthCheckResponse = ResponseStructure<{
  status: string;
}>;
