import type { auth } from "./auth";

import { nextCookies } from "better-auth/next-js";
import {
  customSessionClient,
  genericOAuthClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  plugins: [
    nextCookies(),
    genericOAuthClient(),
    customSessionClient<typeof auth>(),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
