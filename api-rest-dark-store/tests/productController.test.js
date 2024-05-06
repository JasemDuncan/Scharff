const request = require('supertest');
const express = require('express');
const app = express();
const Product = require('../models/Product');
const { validateProduct } = require('../helpers/validateProduct');
const {
    create,
    list,
    one,
    deleteOne,
    update,
    uploadImage,
    image,
    search
} = require('../controllers/product');

app.post('/api/products', create);
app.get('/api/products', list);
app.get('/api/products/:id', one);
app.delete('/api/products/:id', deleteOne);
app.put('/api/products/:id', update);
app.post('/api/upload_image/:id', uploadImage);
app.get('/api/image/:file', image);
app.get('/api/search/:search', search);


describe('validateProduct', () => {
    it('should throw error if name is empty', () => {
        const parameters = { name: '' };
        expect(() => validateProduct(parameters)).toThrow('No data validation');
    });

    it('should throw error if name length is less than 1', () => {
        const parameters = { name: '' };
        expect(() => validateProduct(parameters)).toThrow('No data validation');
    });

    it('should throw error if name length is greater than 100', () => {
        const parameters = { name: 'a'.repeat(101) };
        expect(() => validateProduct(parameters)).toThrow('No data validation');
    });

    it('should not throw error if name is valid', () => {
        const parameters = { name: 'Valid product name' };
        expect(() => validateProduct(parameters)).not.toThrow();
    });
});


describe('POST /api/products', () => {
    it('should not create a new product without name', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                name: '',
                description: 'Descripción del producto de prueba',
                price: 10
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.status).toBe('error');
    });
});

jest.mock('../models/Product', () => ({
    findById: jest.fn(),
}));

describe('GET /api/products/:id', () => {
    it('should return a product by ID', async () => {
        const productMock = { _id: '123', name: 'Product' };
        Product.findById.mockResolvedValueOnce(productMock);

        const req = { params: { id: '123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await one(req, res);

        expect(Product.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'Success',
            product: productMock,
        });
    });

    it('should handle error if product is not found by ID', async () => {
        Product.findById.mockResolvedValueOnce(null);

        const req = { params: { id: '1234' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await one(req, res);

        expect(Product.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'No product was found',
        });
    });
});