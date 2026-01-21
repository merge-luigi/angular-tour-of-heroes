                                                                                                                                                        20/01/2026
                                                                                                                                                            10:47 
                ╔═══════════════════════════════════════════════════════════════════════╗
                ║                                                                       ║
                ║                               IDEAS                                   ║
                ║                                                                       ║
                ╚═══════════════════════════════════════════════════════════════════════╝

# el proyecto podría pasar a llamarse "Un salto de fe"

═══════════════════════════════════════════════════════════════════════
                            /START
═══════════════════════════════════════════════════════════════════════

- Imagen estatica de la ciudad de N.Y.
- Al presionar /START, un efecto debe de unir N.Y con el otro frame de Miles que se encuentra en "/begin".

═══════════════════════════════════════════════════════════════════════
                            /BEGIN
═══════════════════════════════════════════════════════════════════════

- Comienza la imagen de Miles, automaticamente comienza el vídeo

═══════════════════════════════════════════════════════════════════════
                            /HOME
═══════════════════════════════════════════════════════════════════════

- Punto 0 y sin retorno a /begin ni /start.
- Salvo "posible reinicio"?

posible reinicio

// En home.component.ts
resetApp() {
  // Opcional: limpiar localStorage si guardás algo
  localStorage.removeItem('introSeen');
  
  // Volver al inicio
  this.router.navigate(['/start']);
}

Luego de salir de /begin










