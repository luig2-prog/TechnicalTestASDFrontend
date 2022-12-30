export interface Jwt{
    token:string;
    tokenDeAcceso:string;
    type:string;
    usernameOrEmail:string;
    authorities:string[];
}