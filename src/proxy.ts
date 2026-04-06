export { auth as proxy } from "@/auth"

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|avif)$|.*\\.(?:woff2?|eot|ttf|otf)$).*)"],
}
