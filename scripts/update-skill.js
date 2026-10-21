#!/usr/bin/env node
/**
 * WebAtelier - Script de Actualización Automática
 * Permite a cualquier usuario o agente actualizar la Skill a la última versión de GitHub.
 */
import { execSync } from 'node:child_process';

console.log('\n============================================================');
console.log('  WebAtelier · Comprobando Actualizaciones desde GitHub');
console.log('  Repositorio: https://github.com/BenjaminMurga/WebAtelier');
console.log('============================================================\n');

try {
  console.log('Descargando últimos cambios desde origin/main...');
  execSync('git pull origin main', { stdio: 'inherit' });
  console.log('\n✓ WebAtelier se ha actualizado correctamente.');
  console.log('Ejecutando pruebas de integridad...');
  execSync('npm test', { stdio: 'inherit' });
  console.log('\n✓ Todo en orden. Tu entorno de agentes ya tiene la versión más reciente.\n');
} catch (err) {
  console.warn('\n[AVISO] No se pudo actualizar automáticamente mediante Git.');
  console.warn('Si descargaste la carpeta como archivo ZIP, para mantenerla sincronizada se recomienda clonarla con:');
  console.warn('  git clone https://github.com/BenjaminMurga/WebAtelier.git\n');
}
