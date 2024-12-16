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
                password: 'password123',
                role_id: role.id
            });
            //Verificaciones 
            expect(admin).toBeDefined();
            expect(admin.username).toBe('admin');
            expect(admin.password).toBe('password123');
            expect(admin.role_id).toBe(role.id);
        });
        it('No debe permitir administradores sin username', async ()=> {
            const role = await Role.create({
                name: 'RoleWithoutUsername',
            });
            //Intentamos crear un admin sin username
            await expect(
                Admin.create({
                    username: null, // Campo nulo no permitido
                    password: 'password123',
                    role_id: role.id,
                })
            ).rejects.toThrow(); // Verificar que lanza un error
        });
        it('No debe permitir administradoeres sin password', async () =>{
            const role = await Role.create({
                name: 'RoleWithoutPassword',
            });
            //Intentamos crear un admin sin password
            await expect(
                Admin.create({
                    username: 'UserWithoutPassword',
                    password: null, // Campo nulo no permitido
                    role_id: role.id,
                })
            ).rejects.toThrow(); // Verificar que lanza un error
        });
        
        })

    })
