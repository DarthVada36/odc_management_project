//TEST BACKEND
import connectionDb from '../database/connectionDb.js'; 
import { Role, syncModels } from '../models/indexModels.js';

describe('Modelo Role', () => {
    //Configuración inicial antes de ejecutar las pruebas
    beforeAll(async () => {
        await syncModels(); // Sincronizar modelos
    });

//Limpieza después de la pruebas
afterAll(async () => {
    await connectionDb.close(); //Cerramos conexión

});

describe('Creación de Roles', () => {
    // afterEach se ejecuta después de cada test en este bloque
    afterEach(async () => {
      await Role.destroy({ where: {} });
    });
// Tests individuales usando it o test
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
