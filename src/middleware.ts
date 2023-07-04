import { type UserRole } from "@/models"
import { clerkClient } from "@clerk/nextjs"
import { authMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { productCategories } from "./config/products"
import { slugify } from "./lib/utils"

const SSR_URL_GENERATE_CATEGORIES = productCategories.map(category => `/products/${slugify(category.title)}`)
const SSR_URL_GENERATE_PRODUCTS = productCategories.map(category => category.products.map(product => `/products/${slugify(category.title)}/${product.slug}`)).flat()

export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: [
    "/",
    "/signin(.*)",
    "/signup(.*)",
    "/products",
  ].concat(SSR_URL_GENERATE_CATEGORIES).concat(SSR_URL_GENERATE_PRODUCTS),

  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next()
    }

    const url = new URL(req.nextUrl.origin)

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = "/signin"
      return NextResponse.redirect(url)
    }

    // Set the user's role to user if it doesn't exist
    const user = await clerkClient.users.getUser(auth.userId)

    if (!user) {
      throw new Error("User not found.")
    }

    // If the user doesn't have a role, set it to user
    if (!user.privateMetadata.role) {
      await clerkClient.users.updateUser(auth.userId, {
        privateMetadata: {
          ...user.privateMetadata,
          role: "user" satisfies UserRole,
        },
      })
    }
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
}
