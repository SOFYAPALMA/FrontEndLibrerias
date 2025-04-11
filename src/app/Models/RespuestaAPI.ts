export interface RespuestaAPI {
    token(arg0: string, token: any): unknown;  
    success: boolean;
    message: string;
    data: any[];
    
}