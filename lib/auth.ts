import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { genericOAuth, admin, customSession } from "better-auth/plugins";

import { db } from "@/db/drizzle";
import { account, session, user, verification } from "@/drizzle/schemas";
export const auth = betterAuth({
  //...
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      verification: verification,
      account: account,
      session: session,
    },
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    freshAge: 60 * 10, // 5 minutes (the session is fresh if created within the last 5 minutes)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  plugins: [
    admin({
      defaultRole: "student",
    }),
    genericOAuth({
      config: [
        {
          providerId: "42school",
          clientId: `${process.env.INTRA_API_UID}`,
          clientSecret: `${process.env.INTRA_API_SECRET}`,
          authorizationUrl: "https://api.intra.42.fr/oauth/authorize",
          scopes: ["public"],
          userInfoUrl: "https://api.intra.42.fr/v2/me",
          tokenUrl: "https://api.intra.42.fr/oauth/token",

          mapProfileToUser: async (profile) => {
            return {
              name: profile.displayname,
              email: profile.email,
              emailVerified: true,
              image: profile.image.link,
              login: profile.login,
              role: profile.kind,
            };
          },
        },
      ],
    }),
    customSession(async ({ user, session }) => {
      const userData = await db.query.user.findFirst({
        where: (userTable, { eq }) => eq(userTable.id, user.id),
      });

      return {
        user: {
          ...user,
          role: userData!.role,
        },
        session,
      };
    }),
  ],
  user: {
    additionalFields: {
      login: {
        type: "string",
        required: true,
      },
    },
  },
});
