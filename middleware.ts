import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: "/" 
  // at the first time. the website will be landing to sign in page http://localhost:3000/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F
  // set publicRoutes to be able to access http://localhost:3000/ url
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};