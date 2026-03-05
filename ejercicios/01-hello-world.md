[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/hFrJPtTG)
# 🧪 Ejercicio 1 --- Hello World con GitHub Actions

## 🎯 Objetivo

Crear tu primer workflow de GitHub Actions que imprima:

¡Hola, mundo!

------------------------------------------------------------------------

## 📋 ¿Qué tienes que hacer?

### 1️⃣ Crear el archivo del workflow

Crea la siguiente estructura en la raíz del repositorio:

.github/workflows/workflow.yml

⚠️ Es importante que: - La carpeta se llame exactamente `.github` -
Dentro exista la carpeta `workflows` - El archivo se llame
`workflow.yml`

------------------------------------------------------------------------

### 2️⃣ Configurar el workflow

Tu workflow debe:

-   Llamarse: **HELLO WORLD**
-   Ejecutarse cuando haya un `push`
-   Tener un job llamado: `Saludo`
-   Ejecutarse en: `ubuntu-latest`
-   Tener un único step llamado: `echo-hello-world`
-   Imprimir en consola:

```{=html}
 ¡Hola, mundo!
```
 

------------------------------------------------------------------------

### 3️⃣ Hacer push

Guarda los cambios y haz push al repositorio.

------------------------------------------------------------------------

### 4️⃣ Comprobar que funciona

1.  Ve a la pestaña **Actions** del repositorio.
2.  Verifica que se ejecutó el workflow.
3.  Entra en el job `Saludo`.
4.  Comprueba que aparece el mensaje:

    ¡Hola, mundo!

------------------------------------------------------------------------

## ✅ Resultado esperado

Si todo está correcto:

-   El workflow se ejecuta automáticamente al hacer push.
-   El job termina en verde.
-   Se imprime correctamente el mensaje.

------------------------------------------------------------------------

## 🧠 Consejo

Si no se ejecuta el workflow:

-   Revisa que la ruta sea correcta: `.github/workflows/workflow.yml`
-   Revisa que el nombre del archivo esté bien escrito
-   Verifica la indentación (YAML es sensible a espacios)

------------------------------------------------------------------------

🚀 ¡Tu primera automatización con GitHub Actions!
