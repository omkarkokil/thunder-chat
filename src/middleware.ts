import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "https://thunder-chat-navy.vercel.app/",
  },
});

export const config = {
  matcher: [
    "/conversations/:path*",
    "/users/:path*",
  ]
};