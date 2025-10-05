declare const auth: (role: "user" | "admin") => (request: any, response: any, next: any) => any;
export default auth;
