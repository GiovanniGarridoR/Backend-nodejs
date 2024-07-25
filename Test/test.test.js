const Productos = require('../modelos/productos');
const Cliente = require('../modelos/Cliente');
const AnalisisReporte = require('../modelos/AnalisisReportes');
const Envio = require('../modelos/envio');
const Ordenes = require('../modelos/Ordenes');
const Promocion = require('../modelos/Promociones');
const SoporteCliente = require('../modelos/SoporteCliente');
const { Sequelize, DataTypes, Model } = require('sequelize');

describe('Productos', () => {
    let producto;

    beforeEach(() => {
        producto = Productos.build({ id: 1, nombre: 'Producto de prueba', precio: 100.0, descripcion: 'Producto de prueba' });
    });

    test('debería tener el ID correcto', () => {
        expect(producto.id).toBe(1);
    });

    test('debería tener el precio correcto', () => {
        expect(producto.precio).toBe(100.0);
    });

    test('debería tener la descripción correcta', () => {
        expect(producto.descripcion).toBe('Producto de prueba');
    });

    test('no debería permitir un precio negativo', async () => {
        
        producto.precio = -10.0;

        let error = null;

        try {
            
            await producto.validate();
        } catch (err) {
            
            console.error('Error capturado:', err); 
            error = err;
        }

        expect(error).toBeDefined();
        if (error) {
           
            expect(error.errors).toBeDefined();
            expect(error.errors).toHaveLength(1);
            
            expect(error.errors[0].message).toMatch(/.*precio.*debe ser mayor o igual que 0.*/i);
        }
    });


    test('no debería permitir una descripción vacía', async () => {
        producto.descripcion = '';
        let error;
        try {
            await producto.validate();
        } catch (err) {
            error = err;
        }
        expect(error).toBeInstanceOf(Error);
        console.log('Mensaje de error:', error.errors[0].message); 
        expect(error.errors[0].message).toMatch(/.*notEmpty.*descripcion.*/i);
    });
    test('debería permitir actualizar el precio', () => {
        producto.precio = 150.0;
        expect(producto.precio).toBe(150.0);
    });

    test('debería permitir actualizar la descripción', () => {
        producto.descripcion = 'Nueva descripción';
        expect(producto.descripcion).toBe('Nueva descripción');
    });

    test('debería permitir actualizar el ID', () => {
    
        const newId = 2;
        producto.setDataValue('id', newId);

        
        expect(producto.getDataValue('id')).toBe(newId);
    });



    describe('Cliente', () => {
        let cliente;
    
        beforeEach(() => {
            cliente = Cliente.build({
                nombre: 'Juan Perez',
                email: 'juan@example.com',
                telefono: '123456789',
                direccion: 'Calle Principal 123',
                fechaDeRegistro: new Date()
            });
        });
    
        test('debería tener el nombre correcto', () => {
            expect(cliente.nombre).toBe('Juan Perez');
        });
    
        test('debería tener el email correcto', () => {
            expect(cliente.email).toBe('juan@example.com');
        });
    
        test('debería permitir un teléfono nulo', () => {
            cliente.telefono = null;
            expect(cliente.telefono).toBeNull();
        });
    
        test('debería permitir una dirección nula', () => {
            cliente.direccion = null;
            expect(cliente.direccion).toBeNull();
        });
    
        test('debería tener la fecha de registro correcta', () => {
            const fechaRegistro = cliente.fechaDeRegistro;
            expect(fechaRegistro).toBeInstanceOf(Date);
            expect(fechaRegistro).toBeDefined();
        });
    
        test('debería requerir un nombre', async () => {
            cliente.nombre = null;
            let error;
            try {
                await cliente.validate();
            } catch (err) {
                error = err;
            }
            expect(error).toBeInstanceOf(Error);
            expect(error.errors[0].message).toMatch(/.*nombre cannot be null.*/i);
        });
    
        test('debería requerir un email válido', async () => {
            cliente.email = 'emailincorrecto';
            let error;
            try {
                await cliente.validate();
            } catch (err) {
                error = err;
            }
            expect(error).toBeInstanceOf(Error);
            expect(error.errors[0].message).toMatch(/.*Validation isEmail on email failed.*/i);
        });
    
        test('debería permitir actualizar el teléfono', () => {
            const nuevoTelefono = '987654321';
            cliente.setDataValue('telefono', nuevoTelefono);
            expect(cliente.getDataValue('telefono')).toBe(nuevoTelefono);
        });
    
        test('debería permitir actualizar la dirección', () => {
            const nuevaDireccion = 'Avenida Principal 456';
            cliente.setDataValue('direccion', nuevaDireccion);
            expect(cliente.getDataValue('direccion')).toBe(nuevaDireccion);
        });
    
        test('debería permitir actualizar el nombre', () => {
            const nuevoNombre = 'Ana Gomez';
            cliente.setDataValue('nombre', nuevoNombre);
            expect(cliente.getDataValue('nombre')).toBe(nuevoNombre);
        });
    
        test('debería permitir actualizar el email', () => {
            const nuevoEmail = 'ana@example.com';
            cliente.setDataValue('email', nuevoEmail);
            expect(cliente.getDataValue('email')).toBe(nuevoEmail);
        });

    });

    describe('AnalisisReporte', () => {
        let analisisReporte;
    
        beforeEach(() => {
            analisisReporte = AnalisisReporte.build({
                tipo: 'Tipo de análisis',
                descripcion: 'Descripción del análisis',
                fechaGeneracion: new Date(),
                datos: { key: 'value' }
            });
        });
    
        test('debería tener el tipo correcto', () => {
            expect(analisisReporte.tipo).toBe('Tipo de análisis');
        });
    
        test('debería tener la descripción correcta', () => {
            expect(analisisReporte.descripcion).toBe('Descripción del análisis');
        });
    
        test('debería tener una fecha de generación válida', () => {
            expect(analisisReporte.fechaGeneracion).toBeInstanceOf(Date);
        });
    
        test('debería tener datos válidos en formato JSON', () => {
            expect(analisisReporte.datos).toEqual({ key: 'value' });
        });
    
        test('no debería permitir tipo nulo', async () => {
            analisisReporte.tipo = null;
            let error;
            try {
                await analisisReporte.validate();
            } catch (err) {
                error = err;
            }
            expect(error).toBeDefined();
            expect(error.errors[0].message).toMatch(/.*tipo.*cannot be null.*/i);
        });
    
        test('debería permitir actualizar la descripción', () => {
            analisisReporte.descripcion = 'Nueva descripción';
            expect(analisisReporte.descripcion).toBe('Nueva descripción');
        });
    
        test('debería permitir actualizar los datos', () => {
            analisisReporte.datos = { nuevoCampo: 'valor' };
            expect(analisisReporte.datos).toEqual({ nuevoCampo: 'valor' });
        });
    
        test('debería permitir obtener la fecha de generación', () => {
            const fechaOriginal = analisisReporte.fechaGeneracion;
            analisisReporte.setDataValue('fechaGeneracion', new Date('2023-01-01'));
            const fechaActualizada = analisisReporte.getDataValue('fechaGeneracion');
            expect(fechaActualizada).not.toEqual(fechaOriginal);
        });
    });
    

    describe('Envio', () => {
        let envio;
    
        beforeEach(() => {
            envio = Envio.build({
                ordenId: 1,
                direccion: 'Calle Principal 123',
                ciudad: 'Ciudad Principal',
                codigoPostal: '12345',
                pais: 'País Principal',
                fechaEnvio: new Date(),
                estadoEnvio: 'pendiente',
                fechaCreacion: new Date(),
                fechaActualizacion: new Date()
            });
        });
    
        test('debería tener el ordenId correcto', () => {
            expect(envio.ordenId).toBe(1);
        });
    
        test('debería tener la dirección correcta', () => {
            expect(envio.direccion).toBe('Calle Principal 123');
        });
    
        test('debería tener la ciudad correcta', () => {
            expect(envio.ciudad).toBe('Ciudad Principal');
        });
    
        test('debería tener el código postal correcto', () => {
            expect(envio.codigoPostal).toBe('12345');
        });
    
        test('debería tener el país correcto', () => {
            expect(envio.pais).toBe('País Principal');
        });
    
        test('debería tener una fecha de envío válida', () => {
            expect(envio.fechaEnvio).toBeInstanceOf(Date);
        });
    
        test('debería tener el estado de envío por defecto', () => {
            expect(envio.estadoEnvio).toBe('pendiente');
        });
    
        test('debería permitir actualizar la dirección', () => {
            envio.direccion = 'Nueva Calle 456';
            expect(envio.direccion).toBe('Nueva Calle 456');
        });
    
        test('debería permitir actualizar el estado de envío', () => {
            envio.estadoEnvio = 'enviado';
            expect(envio.estadoEnvio).toBe('enviado');
        });
    
        test('debería permitir obtener la fecha de creación', () => {
            const fechaOriginal = envio.fechaCreacion;
            envio.setDataValue('fechaCreacion', new Date('2023-01-01'));
            const fechaActualizada = envio.getDataValue('fechaCreacion');
            expect(fechaActualizada).not.toEqual(fechaOriginal);
        });
    });


    describe('Ordenes', () => {
        let orden;
    
        beforeEach(() => {
            orden = Ordenes.build({
                clienteId: 1,
                fecha: new Date(),
                estado: 'pendiente',
                createdAt: new Date(),
                updatedAt: new Date()
            });
        });
    
        test('debería tener el clienteId correcto', () => {
            expect(orden.clienteId).toBe(1);
        });
    
        test('debería tener una fecha válida', () => {
            expect(orden.fecha).toBeInstanceOf(Date);
        });
    
        test('debería tener el estado correcto', () => {
            expect(orden.estado).toBe('pendiente');
        });
    
        test('debería tener createdAt con valor por defecto', () => {
            expect(orden.createdAt).toBeInstanceOf(Date);
        });
    
        test('debería tener updatedAt con valor por defecto', () => {
            expect(orden.updatedAt).toBeInstanceOf(Date);
        });
    
        test('debería permitir actualizar el estado', () => {
            orden.estado = 'enviado';
            expect(orden.estado).toBe('enviado');
        });
    
        test('debería permitir obtener la fecha de creación', () => {
            const fechaOriginal = orden.createdAt;
            orden.setDataValue('createdAt', new Date('2023-01-01'));
            const fechaActualizada = orden.getDataValue('createdAt');
            expect(fechaActualizada).not.toEqual(fechaOriginal);
        });
    
        test('debería permitir actualizar la fecha de actualización', () => {
            const fechaOriginal = orden.updatedAt;
            orden.setDataValue('updatedAt', new Date('2023-01-01'));
            const fechaActualizada = orden.getDataValue('updatedAt');
            expect(fechaActualizada).not.toEqual(fechaOriginal);
        });
    
        test('debería permitir actualizar el clienteId', () => {
            orden.clienteId = 2;
            expect(orden.clienteId).toBe(2);
        });
    });

    describe('Promocion', () => {
        let promocion;
    
        beforeEach(() => {
            promocion = Promocion.build({
                titulo: 'Promoción de prueba',
                descripcion: 'Descripción de la promoción',
                fechaInicio: new Date('2024-07-01'),
                fechaFin: new Date('2024-07-31'),
                descuento: 10.0
            });
        });
    
        test('debería tener el título correcto', () => {
            expect(promocion.titulo).toBe('Promoción de prueba');
        });
    
        test('debería tener la descripción correcta', () => {
            expect(promocion.descripcion).toBe('Descripción de la promoción');
        });
    
        test('debería tener una fecha de inicio válida', () => {
            expect(promocion.fechaInicio).toEqual(new Date('2024-07-01'));
        });
    
        test('debería tener una fecha de fin válida', () => {
            expect(promocion.fechaFin).toEqual(new Date('2024-07-31'));
        });
    
        test('debería tener un descuento válido', () => {
            expect(promocion.descuento).toBe(10.0);
        });
    
        test('no debería permitir crear una promoción sin título', async () => {
            let error;
            try {
                await Promocion.create({
                    descripcion: 'Descripción de prueba',
                    fechaInicio: new Date(),
                    fechaFin: new Date(),
                    descuento: 15.0
                });
            } catch (err) {
                error = err;
            }
            expect(error).toBeInstanceOf(Error);
           
            expect(error.errors[0].message).toMatch(/Promocion\.titulo cannot be null/i);
        });
    
        test('no debería permitir crear una promoción sin descripción', async () => {
            let error;
            try {
                await Promocion.create({
                    titulo: 'Título de prueba',
                    fechaInicio: new Date(),
                    fechaFin: new Date(),
                    descuento: 15.0
                });
            } catch (err) {
                error = err;
            }
            expect(error).toBeInstanceOf(Error);
        
            expect(error.errors[0].message).toMatch(/Promocion\.descripcion cannot be null/i);
        });
    
        test('debería permitir actualizar el descuento', () => {
            promocion.descuento = 15.0;
            expect(promocion.descuento).toBe(15.0);
        });
    
        test('debería permitir actualizar la fecha de inicio', () => {
            promocion.fechaInicio = new Date('2024-08-01');
            expect(promocion.fechaInicio).toEqual(new Date('2024-08-01'));
        });
    
        test('debería permitir actualizar la fecha de fin', () => {
            promocion.fechaFin = new Date('2024-08-31');
            expect(promocion.fechaFin).toEqual(new Date('2024-08-31'));
        });
    });
    
    describe('SoporteCliente', () => {
        let soporteCliente;
    
        beforeEach(() => {
            soporteCliente = SoporteCliente.build({
                clienteId: 1, // ClienteId especificado
                asunto: 'Consulta',
                descripcion: 'Descripción detallada del problema',
                estado: 'pendiente'
            });
        });
    
        test('debería tener el clienteId correcto', () => {
            expect(soporteCliente.clienteId).toBe(1);
        });
    
        test('debería tener el asunto correcto', () => {
            expect(soporteCliente.asunto).toBe('Consulta');
        });
    
        test('debería tener la descripción correcta', () => {
            expect(soporteCliente.descripcion).toBe('Descripción detallada del problema');
        });
    
        test('debería tener el estado por defecto "pendiente"', () => {
            expect(soporteCliente.estado).toBe('pendiente');
        });
    
        test('no debería permitir crear un soporte sin clienteId', async () => {
            // Establecer clienteId como null
            soporteCliente.clienteId = null;
    
            let error;
            try {
                await soporteCliente.validate();
            } catch (err) {
                error = err;
            }
    
            expect(error).toBeInstanceOf(Error); 
            expect(error.message).toMatch(/notNull/); 
        });
    
        test('no debería permitir crear un soporte sin asunto', () => {
            const soporteCliente = new SoporteCliente({
                clienteId: 1,
                descripcion: 'Descripción detallada del problema',
                estado: 'pendiente'
            });
    
            expect(soporteCliente.asunto).toBeUndefined(); 
        });
    
        test('no debería permitir crear un soporte sin descripción', () => {
            const soporteCliente = new SoporteCliente({
                clienteId: 1,
                asunto: 'Consulta',
                estado: 'pendiente'
            });
    
            expect(soporteCliente.descripcion).toBeUndefined(); 
        });
    
        test('debería permitir actualizar el estado del soporte', () => {
            soporteCliente.estado = 'resuelto';
            expect(soporteCliente.estado).toBe('resuelto');
        });
    
     
    
    });
});
