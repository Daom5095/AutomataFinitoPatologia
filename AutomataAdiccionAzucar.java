public class AutomataAdiccionAzucar {
    private Estado estadoActual;

    public AutomataAdiccionAzucar() {
        this.estadoActual = Estado.S0; // Estado inicial
    }

    public void procesarEntrada(Sintoma entrada) {
        switch (estadoActual) {
            case S0:
                if (entrada == Sintoma.C) estadoActual = Estado.S1;
                break;
            case S1:
                if (entrada == Sintoma.A) estadoActual = Estado.S2;
                break;
            case S2:
                if (entrada == Sintoma.S) estadoActual = Estado.S3;
                break;
            case S3:
                if (entrada == Sintoma.D) estadoActual = Estado.S4;
                break;
            case S4:
                if (entrada == Sintoma.I) estadoActual = Estado.S5;
                break;
            default:
                break;
        }
    }

    public boolean esAdiccionConfirmada() {
        return estadoActual == Estado.S5;
    }
}
