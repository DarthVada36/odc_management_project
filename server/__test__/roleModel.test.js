//TEST BACKEND
//importar la conexión a la base de datos y los modelos
import connectionDb from '../database/connectionDb.js'; 
import { Role, syncModels } from '../models/indexModels.js';

//Bloque para el modelo 'Role'
describe('Modelo Role', () => {
    //Configuración inicial antes de ejecutar las pruebas
    beforeAll(async () => { //Hook que se ejecuta una vez antes de todos los tests
        await syncModels(); // Sincronizar modelos de la bbdd, esto asegura que las tablas estén creadas antes de comenzar las pruebas
    });

//Hook. Limpieza después de la pruebas
afterAll(async () => {
    await connectionDb.close(); //Cerramos conexión

});

//Bloque para verificar la creación de roles
describe('Creación de Roles', () => {
    //Hook se ejecuta después de cada test en este bloque
    afterEach(async () => {
        //Limpiamos los datos de la tabla 'Role' después de cada test
      await Role.destroy({ where: {} });
    });
// Tests 
it('Debe crear un rol válido', async () => {
    const role = await Role.create({ 
        name: 'Admin' //Nombre único del rol
    });  
    //verificaciones
    expect(role).toBeDefined();  //Verifica que el registro exista
    expect(role.name).toBe('Admin'); // Verifica que el nombre sea el correcto
  });

  it('No debe permitir roles sin nombre', async () => {
    await expect(
        Role.create({ 
            name: null 
        }))
      .rejects.toThrow();
  });
});   

describe('Validaciones de Roles', () => {
    it('No debe permitir nombres duplicados', async () => {
      await Role.create({ 
        name: 'Duplicado' 
    });
      await expect(
        Role.create({ 
            name: 'Duplicado' 
        }))
        .rejects.toThrow();
    });
  });
})
