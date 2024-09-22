export class AccionGrafica {
    ejecutar(): void {
        console.log("Acción gráfica ejecutada");
    }
}

export class AccionGraficaCambiarVelovidad extends AccionGrafica {
    ejecutar(): void {
        console.log("OTttor");
    }
}