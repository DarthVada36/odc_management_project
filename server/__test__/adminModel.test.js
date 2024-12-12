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
    
    
})