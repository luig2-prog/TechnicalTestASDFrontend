export interface AnalisisFisicoQuimicos {

    cdunicanalisisfisicoquimicos: string;
    cdunimuestra: string;
    tipoanalisis : string;
    fechacreacion : Date;
    fechamodificacion : Date;

    equipoTitulacion : number;
    capacidad: number;
    metodoTitulacion: number;
    resolucion : number;
    codigo : string;
    deteccionPuntoFinal: number;
    concentracionTitulante : string;
    codigoMuestra : string;
    fechaToma : Date;

    alicuota: number;
    diluido : number;
    factorDilucion : number;
    blanco : number;
    volumen1 : number;
    volumen2 : number;
    concentracion1 : number;
    concentracion2 : number;
    concentracionPromedio : number;
    concentracionteorica : number;
    concentracionReal : number;
    recuperacion : number;
    observaciones : string;
}