export interface AnalisiBasicos{
        //EN COMÚN
        cdunicanalisisbasico: string;
        cdunimuestra:string;
        tipoanalisis:string;
        equipoMedicion: number;
        codigo: string;
        codigoMuestra:string;
        fechaToma: number;
        lectura1: number;
        lectura2:number;
        promedio: number;
        observaciones:string;
        vlrTeorico: number;
        vlrReal:number;
        recuperacion: number;
        cdestado:number;
        //ph
        unidad1:number;
        unidad2: number;
        unidad3: number;
        vlrPendiente: number;
        //conductividad
        vlrCosnCelda:number;
        //color aparente y color real
        cero:number;
        docientoscincuenta:number;
    
        //turbidez
        vlrObtenido1:number;
        vlrObtenido2:number;
}