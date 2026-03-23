// # 3. Actualizar el fichero index.js:
// #    3.1 Recuperar los inputs usando los métodos getInput y getBooleanInput del paquete @actions/core. Por ej:
// #       ```javascript
// #        const core = require('@actions/core');
// #        async function run() {
// #            const baseBranch = core.getInput('base-branch');
// #            const targetBranch = core.getInput('target-branch');
// #            const workingDirectory = core.getInput('working-directory');
// #            const ghToken = core.getInput('gh-token');
// #            const debug = core.getBooleanInput('debug');
// #        }
// #        // Ejecuta la función run
// #        run();
// #      ```
// #    3.2 Validar que los inputs proporcionados sigan las siguientes restricciones:
// #       - Los nombres de las ramas deben contener solo letras, dígitos, guiones bajos, guiones, puntos y barras inclinadas.
// #       - Las rutas de directorio deben contener solo letras, dígitos, guiones bajos, guiones y barras inclinadas.
// #       Para validar los inputs, puedes usar expresiones regulares o funciones de validación personalizadas. Por ejemplo, puedes usar la función test de una expresión regular para validar los nombres de las ramas:
// #         ```javascript
// #         const branchRegex = /^[a-zA-Z0-9-_.-\/]+$/;
// #         if (!branchRegex.test(baseBranch)) {
// #             core.setFailed('The base branch name is invalid.');
// #         }
// #         ```
// #    3.3 Si alguna validación falla, usa el método setFailed del paquete @actions/core para establecer un mensaje de error y fallar la ejecución de la acción.
// #    3.4 Si todas las validaciones pasan, imprime la siguiente información en la pantalla:
// #       - El valor de la rama base
// #       - El valor de la rama objetivo
// #       - El valor del directorio de trabajo
// #       Para escribir en la salida de la acción, puedes usar el método info del paquete @actions/core:
// #         ```javascript
// #         core.info(`Base branch: ${baseBranch}`);
// #         core.info(`Target branch: ${targetBranch}`);
// #         core.info(`Working directory: ${workingDirectory}`);
// #         ```
// #    3.5 Aprovecha el paquete @actions/exec para ejecutar scripts de shell. Para ello, usa el método exec del paquete mencionado, o el método getExecOutput cuando necesites acceso al stdout y stderr del comando:
// #       - Ejecuta el comando npm update dentro del directorio de trabajo proporcionado (consulta la documentación del método exec para ver cómo proporcionar el directorio de trabajo para el comando). 
// #         Por ejemplo, puedes usar el siguiente código para ejecutar el comando npm update:
// #         ```javascript
// #         const exec = require('@actions/exec');
// #         await exec.exec('npm', ['update'], { cwd: workingDirectory });
// #         ```
// #       - Ejecuta el comando git status -s package*.json para comprobar si hay actualizaciones en los archivos package*.json. Usa el método getExecOutput y almacena el valor de retorno del método en una variable para su uso posterior.
// #         Por ejemplo, puedes usar el siguiente código para ejecutar el comando git status:
// #         ```javascript

// #         let gitStatusOutput = await exec.getExecOutput('git', ['status', '-s', 'package*.json'], { cwd: workingDirectory });
// #         ```
// #       - Si el stdout del comando git status tiene algún carácter, imprime un mensaje diciendo que hay actualizaciones disponibles. De lo contrario, imprime un mensaje diciendo que no hay actualizaciones en este momento.
// #         Por ejemplo, puedes usar el siguiente código para comprobar si hay actualizaciones disponibles:
// #         ```javascript
// #             if (gitStatusOutput.stdout) {
// #                 core.info('There are updates available.');
// #             } else {
// #                 core.info('There are no updates at this point in time.');
// #             }
// #




const core = require('@actions/core');
async function run() {
  const baseBranch = core.getInput('base-branch');
  const targetBranch = core.getInput('target-branch');
  const workingDirectory = core.getInput('working-directory');
  const ghToken = core.getInput('gh-token');
  const debug = core.getBooleanInput('debug');

  core.info(`Base branch: ${baseBranch}`);
  core.info(`Target branch: ${targetBranch}`);
  core.info(`Working directory: ${workingDirectory}`);

  const exec = require('@actions/exec');
  await exec.exec('npm', ['update'], { cwd: workingDirectory });

  let gitStatusOutput = await exec.getExecOutput('git', ['status', '-s', 'package*.json'], { cwd: workingDirectory });

  if (gitStatusOutput.stdout) {
    core.info('There are updates available.');

    // Al principio del archivo, importa el paquete @actions/github
    const github = require('@actions/github');
    // Código restante
    const octokit = github.getOctokit(ghToken);
    try {
      await octokit.rest.pulls.create({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        title: `Update NPM dependencies`,
        body: `This pull request updates NPM packages`,
        base: baseBranch,
        head: targetBranch
      });
    } catch (e) {
      core.error('[js-dependency-update] : Something went wrong while creating the PR. Check logs below.');
      core.setFailed(e.message);
      core.error(e);
    }
  } else {
    core.info('There are no updates at this point in time.');
  }

}
// Ejecuta la función run
run();