import connectionDb from '../database/connectionDb.js'; 
import { Role, syncModels, Admin } from '../models/indexModels.js';

describe ('Modelo Admin', () => {
    beforeAll(async () => {
        await syncModels();
        
    });
    
    afterAll(async () => {
        await connectionDb.close();
    });

    afterEach(async () => {
        //await Admin.destroy({ where: {} });
        await Role.destroy({where: {}})
    });
    describe('Creación de Administradores', () => {
        it('Debe crear un administrador válido', async () => {
            //Creamos un rol necesario para la relación
            const role = await Role.create({
                name: 'Admin'
            });
            //Creamos un admin válido
            const admin = await Admin.create({
                username: 'admin',
                password: 'admin123',
                role_id: role.id
            });
            //Verificaciones 
            expect(admin).toBeDefined();
            expect(admin.username).toBe('admin');
            expect(admin.password).toBe('admin123');
            expect(admin.role_id).toBe(role.id);
        });
    })

})