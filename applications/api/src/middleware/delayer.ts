import { applicationConfiguration } from '$api/load-configuration';
import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export const delayerHook = (request: FastifyRequest, response: FastifyReply, done: HookHandlerDoneFunction) => {
  setTimeout(done, applicationConfiguration.globalResponseDelay);
};
