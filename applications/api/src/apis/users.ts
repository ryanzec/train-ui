import { userUtils } from '$api/data-models/user';
import { ApiRoute } from '$api/types/api';
import type { User } from '$api/types/user';
import type {
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  GetUsersResponse,
  PatchUserRequest,
  PatchUserResponse,
  PostUserRequest,
  PostUserResponse,
} from '$api/types/user';
import { apiUtils } from '$api/utils/api';
import { stytchClient } from '$api/utils/stytch';
import type { FastifyInstance } from 'fastify';

// including these roles causes stytch to error out as it can't be removed so just making sure it is not there
const stripOutRoles = ['stytch_member'];

export const registerUsersApi = (api: FastifyInstance) => {
  type GetUsers = { Reply: GetUsersResponse };

  api.get<GetUsers>(ApiRoute.USERS, async (request, response) => {
    try {
      const organizationId = request.session.organizationId;
      const token = request.session.authenticationToken;
      const organizationUsersResponse = await stytchClient.organizations.members.search(
        {
          organization_ids: [organizationId],
        },
        {
          authorization: {
            session_token: token,
          },
        },
      );
      const users = userUtils.fromStytchMembers(organizationUsersResponse.members);

      return response.code(200).send(apiUtils.buildDataResponse(users));
    } catch (error: unknown) {
      return apiUtils.respondWithError(response, { error });
    }
  });

  type GetUser = {
    Params: GetUserRequest;
    Reply: GetUserResponse;
  };

  api.get<GetUser>(`${ApiRoute.USERS}/:id`, async (request, response) => {
    try {
      const getMemberResponse = await stytchClient.organizations.members.get({
        organization_id: request.session.organizationId,
        member_id: request.params.id,
      });
      const user = userUtils.fromStytchMember(getMemberResponse.member);

      return response.code(200).send(apiUtils.buildDataResponse(user));
    } catch (error: unknown) {
      return apiUtils.respondWithError(response, { error });
    }
  });

  type PostUser = {
    Body: PostUserRequest;
    Reply: PostUserResponse;
  };

  api.post<PostUser>(ApiRoute.USERS, async (request, response) => {
    try {
      if (!request.body.name || !request.body.email || !request.body.roles) {
        return response.code(400).send();
      }

      const createMemberResponse = await stytchClient.magicLinks.email.invite(
        {
          organization_id: request.session.organizationId,
          email_address: request.body.email,
          name: request.body.name,
          roles: request.body.roles.filter((role) => !stripOutRoles.includes(role)),
        },
        {
          authorization: {
            session_token: request.session.authenticationToken,
          },
        },
      );
      const user = userUtils.fromStytchMember(createMemberResponse.member);

      // email the user
      await stytchClient.otps.email.loginOrSignup({
        organization_id: request.session.organizationId,
        email_address: request.body.email,
      });

      return response.code(200).send(apiUtils.buildDataResponse(user));
    } catch (error: unknown) {
      return apiUtils.respondWithError(response, { error });
    }
  });

  type PatchUser = {
    Body: Omit<PatchUserRequest, 'id'>;
    Params: Pick<PatchUserRequest, 'id'>;
    Reply: PatchUserResponse;
  };

  api.patch<PatchUser>(`${ApiRoute.USERS}/:id`, async (request, response) => {
    try {
      let { roles, ...updateData } = request.body;

      roles = (roles || []).filter((role) => !stripOutRoles.includes(role));

      const updateMemberResponse = await stytchClient.organizations.members.update(
        {
          organization_id: request.session.organizationId,
          member_id: request.params.id,
          roles: roles.filter((role) => !stripOutRoles.includes(role)),
          ...updateData,
        },
        {
          authorization: {
            session_token: request.session.authenticationToken,
          },
        },
      );

      return response
        .code(200)
        .send(apiUtils.buildDataResponse(userUtils.fromStytchMember(updateMemberResponse.member)));
    } catch (error: unknown) {
      return apiUtils.respondWithError(response, { error });
    }
  });

  type DeleteUser = {
    Params: Pick<User, 'id'>;
    Reply: DeleteUserResponse;
  };

  api.delete<DeleteUser>(`${ApiRoute.USERS}/:id`, async (request, response) => {
    try {
      // @todo(!!!) don't allow deletion of self
      const getMemberResponse = await stytchClient.organizations.members.get({
        organization_id: request.session.organizationId,
        member_id: request.params.id,
      });
      const user = userUtils.fromStytchMember(getMemberResponse.member);
      const options = {
        authorization: {
          session_token: request.session.authenticationToken,
        },
      };

      await stytchClient.organizations.members.delete(
        {
          organization_id: request.session.organizationId,
          member_id: request.params.id,
        },
        options,
      );

      return response.code(200).send(apiUtils.buildDataResponse(user));
    } catch (error: unknown) {
      return apiUtils.respondWithError(response, { error });
    }
  });
};
