const core = require('@actions/core');
async function run() {
    // Escritura en la salida de la acción
  core.info('I am a custom JS action');
}
// Ejecuta la función run
run();