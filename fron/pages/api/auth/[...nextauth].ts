import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import { oauth, signin } from "../../../apis";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                try {
                    /* 로그인 성공 */
                    const { token, role } = await signin(credentials);
                    return { ...credentials, token, role };
                } catch (error) {
                    /* 로그인 실패 */
                    return null;
                }
            },
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
            profile: async (profile) => {
                try {
                    /* 로그인 성공 */
                    const email = profile.kakao_account.email;
                    const { token, role } = await oauth({ email });
                    return { ...profile, email, token, role };
                } catch (error) {
                    /* 로그인 실패 */
                    console.log(error);
                }
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl;
        },
        async jwt({ token, user }) {
            if (user) {
                token.token = user.token;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.token = token.token;
            session.role = token.role;
            return session;
        },
    },
});
