export { default } from "next-auth/middleware";

export const config = { matcher: ["/my-rooms", "/create-room"] };