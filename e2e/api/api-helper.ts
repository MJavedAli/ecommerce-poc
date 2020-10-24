import { expect, logger, yamlHelper } from 'custom-libraries';
import { globalVariable } from 'testData/global-variable';

const axios = require('axios');
class ApiHelper {
    async deletePetByID(petID: string) {
        const uri = process.env.API_BASE_URI + petID;
        const axiosConfig = {
            'Content-Type': 'application/json',
        };
        const jsonData = await axios.delete(
            uri,
            axiosConfig
        );
        try {
            expect(jsonData.status).to.equal(200);
            logger.info(`DELETE PET RESPONSE CODE : ${jsonData.status}`);
            await this.getPetByID(petID).then(() => {
                logger.info(`PET NOT DELETED FAILING THIS TEST`);
                expect(true).equals(false);
            }).catch((error) => {
                if (error.response) {
                    expect(error.response.data.message).equal('Pet not found');
                    logger.info(`QUERYING BY PET_ID FOR DELETED PET RECEIVED RESPONSE MESSAGE : ${error.response.data.message}`)
                }
            })
        } catch (error) {
            logger.error(`Request error: ${error.message}`);
        }

    }


    async getPetsByStatus(uri: String, petStatus: string) {
        uri = uri + 'findByStatus?status=' + petStatus;
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const res = await axios.get(uri, axiosConfig);
            expect(res.status).to.equal(200);
            logger.info(`GET PET BY ID RESPONSE CODE : ${res.status}`);
            const jsonData = JSON.stringify(res.data);
            expect(jsonData.includes('"status":"' + petStatus + '"')).to.equal(true);
        } catch (error) {
            logger.error(`Request error: ${error.message}`);
        }
    }

    public async createNewPetJson(petTypes: string) {
        const category_name = await yamlHelper.getData('PET', 'categoryname', petTypes, 'pet-details.yaml');
        const id = Math.floor((Math.random() * 10000) + 1);
        const name = await yamlHelper.getData('PET', 'name', petTypes, 'pet-details.yaml');
        const jsonBody = JSON.parse('{"id": "' + id + '","category": {"id": 0,"name": "' + category_name + '"},"name": "' + name + '","photoUrls": ["http://example.com/images/rex.png"],"tags": [],"status": "available"} ');
        logger.info("CREATE NEW PET JSON BODY:" + JSON.stringify(jsonBody));
        const axiosConfig = {
            'Content-Type': 'application/json',
        };
        const jsonData = await axios.post(
            process.env.API_BASE_URI,
            jsonBody,
            axiosConfig
        );

        try {
            expect(jsonData.status).to.equal(200);
            logger.info(`ADD NEW PET RESPONSE CODE ${jsonData.status}`);
            const strJsonData = JSON.stringify(jsonData.data);
            logger.info(`ADDED PET ID= ${jsonData.data.id}`);
            globalVariable.newAddedPetId = jsonData.data.id;
            expect(strJsonData.includes('"name":"' + name + '"')).to.equal(true);
        } catch (error) {
            logger.error(`Request error: ${error.message}`);
        }
    }

    async updatePetStatus(newAddedPetId: string, status: string) {
        const existingPet = await this.getPetByID(newAddedPetId);
        const jsonBody = await JSON.parse('{"id": "' + existingPet.data.id + '","category": {"id": 0,"name": "' + existingPet.data.category.name + '"},"name": "' + existingPet.data.name + '","photoUrls": ["http://example.com/images/rex.png"],"tags": [],"status": "' + status + '"} ');
        const axiosConfig = {
            'Content-Type': 'application/json',
        };
        const jsonData = await axios.put(
            process.env.API_BASE_URI,
            jsonBody,
            axiosConfig
        );
        try {
            expect(jsonData.status).to.equal(200);
            logger.info(`UPDATE PET STATUS RESPONSE CODE : ${jsonData.status}`);
            expect(jsonData.data.status).to.equal(status);
            logger.info(`UPDATE PET STATUS FOR PET ID = ${jsonData.data.id} IS NOW ${jsonData.data.status}`);
            logger.info("UPDATED PET JSON BODY:" + JSON.stringify(jsonData.data));

        } catch (error) {
            logger.error(`Request error: ${error.message}`);
        }

    }

    async getPetByID(PetId: string) {
        const uri = process.env.API_BASE_URI + PetId;
        const axiosConfig = {
            'Content-Type': 'application/json',
        };
        const jsonData = await axios.get(
            uri,
            axiosConfig
        );
        try {
            expect(jsonData.status).to.equal(200);
            logger.info(`GET PET BY ID RESPONSE CODE : ${jsonData.status}`);
        } catch (error) {
            logger.error(`Request error: ${error.message}`);
        }
        return jsonData;
    }
}
export const apiHelper: ApiHelper = new ApiHelper();
