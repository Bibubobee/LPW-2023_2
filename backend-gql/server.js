const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//const {graphqlExpress,graphiqlExpress} = require("graphql-server-express");
const {makeExcecutableSchema} = require("graphql-tools")

const {merge} = require("lodash")
const {ApolloServer, gql} = require("apollo-server-express");

const Usuario = require("./models/usuario");
const Perfil = require("./models/perfil");
const Libro = require("./models/libro");
const Genero = require("./models/genero");
const UsuarioPerfil = require("./models/usuarioPerfil");
const LibroGenero = require("./models/libroGenero");
const Ejemplar = require("./models/ejemplar");
const Compra = require("./models/compra");
const Prestamo = require("./models/prestamo");
const DetalleCompra = require("./models/detalleCompra");
const DetallePrestamo = require("./models/detallePrestamo");
const { ObjectId } = require("mongodb");
const detalleCompra = require("./models/detalleCompra");
const jwt = require('jsonwebtoken');

mongoose.connect("mongodb+srv://admin:admin1234@cluster0.1qndxpt.mongodb.net/Iguano",{useNewUrlParser: true,useUnifiedTopology:true});


const generateAccessToken = (user) => {
	const secret = 'contrasenna ultrasecreta que nadie adivinaria porque eso es de mala gente y no quise colocar una variable de entorno :c';
	const expiresIn = '10m';

	const payload = {
    	userId: user.id,
  	};

 	return jwt.sign(payload, secret, { expiresIn });
};

const typeDefs = gql`
	type Usuario{
		id: ID!
		email: String!
		pass: String!
		nombre: String!
		rut: String!
		telefono: String!
		foto: String!
	}
	type Autenticacion{
		success: Boolean!
		token : String
		usuario : Usuario
		message : String
	}
	type Perfil{
		id: ID!
		tipo: String!
	}
	type UsuarioPerfil{
		id: ID!
		usuario: Usuario
		perfil: Perfil
	} 
	type Libro{
		id: ID!
		nombre: String!
		anno: Int!
		copias: Int!
		autor: String!
		sinopsis: String!
		foto: String!
	}
	type Genero{
		id: ID!
		nombre: String!
	}
	type LibroGenero{
		id: ID!
		libro: Libro
		genero: Genero
	}
	type Ejemplar{
		id: ID!
		libro: Libro
	}
	type Compra{
		id: ID!
		bibliotecario: Usuario
	}
	type Prestamo{
		id: ID!
		usuario: Usuario
		bibliotecario: Usuario
	}
	type DetalleCompra{
		id: ID!
		compra: Compra
		fecha_compra: String!
		precio: String!
		ejemplar: Ejemplar
	}
	type DetallePrestamo{
		id: ID!
		prestamo: Prestamo
		fecha_pedido: String!
		fecha_limite: String!
		en_casa: Boolean!
		direccion: String
		fecha_devolucio: String!
		ejemplar: Ejemplar
	}
	type Alert{
		message:String
	}
	input UsuarioInput{
		email: String!
		pass: String!
		nombre: String!
		rut: String!
		telefono: String!
		foto: String!
	}
	input AutenticacionInput{
		email : String!
		pass : String!
	}
	input PerfilInput{
		tipo: String!
	}
	input UsuarioPerfilInput{
		usuario: String!
		perfil: String!
	}
	input LibroInput{
		nombre: String!
		anno: Int!
		copias: Int!
		autor: String!
		sinopsis: String!
		foto: String!
	}
	input GeneroInput{
		nombre: String!
	}
	input LibroGeneroInput{
		libro: String!
		genero: String!
	}
	input EjemplarInput{
		libro: String!
	}
	input CompraInput{
		bibliotecario: String!
	}
	input PrestamoInput{
		usuario: String!
		bibliotecario: String!
	}
	input DetalleCompraInput{
		compra: String!
		fecha_compra: String!
		precio: String!
		ejemplar: String!
	}
	input DetallePrestamoInput{
		prestamo: String!
		fecha_pedido: String!
		fecha_limite: String!
		en_casa: Boolean!
		direccion: String
		fecha_devolucio: String!
		ejemplar: String!
	}
	type Query{
		getUsuarios : [Usuario]
		getUsuario(id: ID!) : Usuario
		getPerfiles : [Perfil]
		getPerfil(id: ID!) : Perfil
		getUsuarioPerfiles(idUsuario: ID!) : [UsuarioPerfil]
		getUsuarioPerfil(idUsuario: ID!, idPerfil: ID!) : UsuarioPerfil
		getLibros : [Libro]
		getLibro(id: ID!) : Libro
		getGeneros : [Genero]
		getGenero(id: ID!) : Genero
		getLibroGeneros(idLibro: ID!) : [LibroGenero]
		getLibroGenero(idLibro: ID!, idGenero: ID!) : LibroGenero
		getEjemplares : [Ejemplar]
		getEjemplar(id: ID!) : Ejemplar
		getCompras : [Compra]
		getCompra(id: ID!) : Compra
		getPrestamos : [Prestamo]
		getPrestamo(id: ID!) : Prestamo
		getDetalleCompras(idCompra: ID!) : [DetalleCompra]
		getDetalleCompra(idCompra: ID!, idEjemplar: ID!) : DetalleCompra
		getDetallePrestamos(idPrestamo: ID!) : [DetallePrestamo]
		getDetallePrestamo(idPrestamo: ID!, idEjemplar: ID!) : DetallePrestamo
	}
	type Mutation{
		addUsuario(input: UsuarioInput) : Usuario
		updateUsuario(id: ID!, input: UsuarioInput) : Usuario
		deleteUsuario(id: ID!) : Alert
		autenticarUsuario(input: AutenticacionInput) : Autenticacion
		addPerfil(input: PerfilInput) : Perfil
		updatePerfil(id: ID!, input: PerfilInput) : Perfil
		deletePerfil(id: ID!) : Alert
		addLibro(input: LibroInput) : Libro
		updateLibro(id: ID!, input: LibroInput) : Libro
		deleteLibro(id: ID!) : Alert
		addGenero(input: GeneroInput) : Genero
		updateGenero(id: ID!, input: GeneroInput) : Genero
		deleteGenero(id:ID!) : Alert
		addUsuarioPerfil(input: UsuarioPerfilInput) : UsuarioPerfil
		updateUsuarioPerfil(id: ID!, input: UsuarioPerfilInput) : UsuarioPerfil
		deleteUsuarioPerfil(id:ID!) : Alert
		addLibroGenero(input: LibroGeneroInput) : LibroGenero
		updateLibroGenero(id: ID!, input: LibroGeneroInput) : LibroGenero
		deleteLibroGenero(id:ID!) : Alert
		addEjemplar(input: EjemplarInput) : Ejemplar
		updateEjemplar(id: ID!, input: EjemplarInput) : Ejemplar
		deleteEjemplar(id: ID!) : Alert
		addCompra(input: CompraInput) : Compra
		updateCompra(id: ID!, input: CompraInput) : Compra
		deleteCompra(id: ID!) : Alert
		addPrestamo(input: PrestamoInput) : Prestamo
		updatePrestamo(id: ID!, input: PrestamoInput) : Prestamo
		deletePrestamo(id: ID!) : Alert
		addDetalleCompra(input: DetalleCompraInput) : DetalleCompra
		updateDetalleCompra(id: ID!, input: DetalleCompraInput) : DetalleCompra
		deleteDetalleCompra(id: ID!) : Alert
		addDetallePrestamo(input: DetallePrestamoInput) : DetallePrestamo
		updateDetallePrestamo(id: ID!, input: DetallePrestamoInput) : DetallePrestamo
		deleteDetallePrestamo(id: ID!) : Alert
	}
`;

const resolvers = {
	Query:{
		async getUsuarios(obj){
			const usuarios = await Usuario.find();
			return usuarios;
		},
		async getUsuario(obj, {id}){
			const usuario = await Usuario.findById(id);
			return usuario;
		},
		async getPerfiles(obj){
			const perfiles = await Perfil.find();
			return perfiles;
		},
		async getPerfil(obj, {id}){
			const perfil = await Perfil.findById(id);
			return perfil;
		},
		async getUsuarioPerfiles(obj, {idUsuario}){
			const usuarioPerfil = await UsuarioPerfil.find({usuario : idUsuario}).populate("usuario perfil");
			return usuarioPerfil;
		},
		async getUsuarioPerfil(obj, {idUsuario, idPerfil}){
			const usuarioPerfil = await UsuarioPerfil.find({ usuario : idUsuario, perfil : idPerfil}).populate('usuario perfil');
			return usuarioPerfil;
		},
		async getLibros(obj){
			const libros = await Libro.find();
			return libros;
		},
		async getLibro(obj, {id}){
			const libro = await Libro.findById(id);
			return libro;
		},
		async getGeneros(obj){
			const generos = await Genero.find();
			return generos;
		},
		async getGenero(obj, {id}){
			const genero = await Genero.findById(id);
			return genero;
		},
		async getLibroGeneros(idLibro){
			const libroGenero = await LibroGenero.find({ libro : idLibro}).populate('libro genero');
			return libroGenero;
		},
		async getLibroGenero(obj, {idLibro, idGenero}){
			const libroGenero = await LibroGenero.find({ libro : idLibro, genero : idGenero}).populate('libro genero');
			return libroGenero;
		},
		async getEjemplares(obj){
			const ejemplares = await Ejemplar.find();
			return ejemplares;
		},
		async getEjemplar(obj, {id}){
			const ejemplar = await Ejemplar.findById(id);
			return ejemplar;
		},
		async getCompras(obj){
			const compras = await Compra.find();
			return compras;
		},
		async getCompra(obj, {id}) {
			const compra = await Compra.findById(id);
			return compra;
		},
		async getPrestamos(obj){
			const prestamos = await Prestamo.find();
			return prestamos;
		},
		async getDetalleCompras(obj, {idCompra}){
			const detalleCompra = await DetalleCompra.find({compra : idCompra}).populate('compra ejemplar');
			return detalleCompra;
		},
		async getDetalleCompra(obj, {idCompra, idEjemplar}) {
			const detalleCompra = await DetalleCompra.find({ compra : idCompra, ejemplar : idEjemplar}).populate('compra ejemplar');
			return detalleCompra;
		},
		async getDetallePrestamos(obj, {idPrestamo}){
			const detallePrestamo = await DetallePrestamo.find({prestamo : idPrestamo}).populate('prestamo ejemplar');
			return detallePrestamo;
		},
		async getDetallePrestamo(obj, {idPrestamo, idEjemplar}) {
			const detallePrestamo = await DetallePrestamo.find({ prestamo : idPrestamo, ejemplar : idEjemplar}).populate('prestamo ejemplar');
			return detallePrestamo;
		},
	},
	Mutation:{
		async addUsuario(obj, {input}){
			const usuario = new Usuario(input);
			await usuario.save();
			return usuario;
		},
		async updateUsuario(obj, {id, input}){
			const usuario = await Usuario.findByIdAndUpdate(id, input);
			return usuario;
		},
		async deleteUsuario(obj, {id}){
			await  Usuario.deleteOne({_id: id});
			return {
				message: "usuario eliminado",
			};
		},
		async autenticarUsuario (obj, {id, input}){
			try {
				const { email, pass } = input;
				const usuario = await Usuario.findOne({ email });
				if (usuario && usuario.pass == pass) {
				 	const token = generateAccessToken(usuario);
				  	return {
				    	success: true,
				    	token,
				    	usuario,
				  	};
				} else {
				  	return {
				    	success: false,
				    	message: 'Correo o contraseña incorrectos',
				  	};
				}
			} catch (message) {
				console.log('Error durante la autenticación:', message);
				return {
				  success: false,
				  message: 'Error durante la autenticación',
				};
			}
		},
		async addPerfil(obj, {input}){
			const perfil = new Perfil(input);
			await perfil.save();
			return perfil;
		},
		async updatePerfil(obj, {id, input}){
			const perfil = await Perfil.findByIdAndUpdate(id, input);
			return perfil;
		},
		async deletePerfil(obj, {id}){
			await  Perfil.deleteOne({_id: id});
			return {
				message: "perfil eliminado",
			};
		},
		async addUsuarioPerfil(obj, {input}){
			let usuarioBus = await Usuario.findById(input.usuario);
			let perfilBus = await Perfil.findById(input.perfil);
			if (usuarioBus != null && perfilBus != null){
				const usuarioPerfil = new UsuarioPerfil({ usuario: usuarioBus._id, perfil: perfilBus._id});
				await usuarioPerfil.save();
				return usuarioPerfil;	
			} else {
				return null;
			}
		},
		async updateUsuarioPerfil(obj, {id, input}){
			let usuarioBus = await Usuario.findById(input.usuario);
			let perfilBus = await Perfil.findById(input.perfil);
			if (usuarioBus != null && perfilBus != null){
				const usuarioPerfil = await UsuarioPerfil.findByIdAndUpdate(id, { usuario: usuarioBus._id, perfil: perfilBus._id});
				return usuarioPerfil;	
			} else {
				return null;
			}
		},
		async deleteUsuarioPerfil(obj, {id}){
			await  UsuarioPerfil.deleteOne({_id: id});
			return {
				message: "usuario perfil eliminado",
			};
		},
		async addLibro(obj, {input}){
			const libro = new Libro(input);
			await libro.save();
			return libro;
		},
		async updateLibro(obj, {id, input}){
			const libro = await Libro.findByIdAndUpdate(id, input);
			return libro;
		},
		async deleteLibro(obj, {id}){
			await  Libro.deleteOne({_id: id});
			return {
				message: "libro eliminado",
			};
		},
		async addGenero(obj, {input}){
			const genero = new Genero(input);
			await genero.save();
			return genero;
		},
		async updateGenero(obj, {id, input}){
			const genero = await Genero.findByIdAndUpdate(id, input);
			return genero;
		},
		async deleteGenero(obj, {id}){
			await  Genero.deleteOne({_id: id});
			return {
				message: "genero eliminado",
			};
		},
		async addLibroGenero(obj, {input}){
			let libroBus = await Libro.findById(input.libro);
			let generoBus = await Genero.findById(input.genero);
			if (libroBus != null && generoBus != null){
				const libroGenero = new LibroGenero({ libro: libroBus._id, genero: generoBus._id});
				await libroGenero.save();
				return libroGenero;	
			} else {
				return null;
			}
		},
		async updateLibroGenero(obj, {id, input}){
			let libroBus = await Libro.findById(input.libro);
			let generoBus = await Genero.findById(input.genero);
			if (libroBus != null && generoBus != null){
				const libroGenero = await LibroGenero.findByIdAndUpdate(id, { libro: libroBus._id, genero: generoBus._id});
				return libroGenero;	
			} else {
				return null;
			}
		},
		async deleteLibroGenero(obj, {id}){
			await  LibroGenero.deleteOne({_id: id});
			return {
				message: "libro genero eliminado",
			};
		},
		async addEjemplar(obj, {input}){
			const ejemplar = new Ejemplar(input);
			await ejemplar.save();
			return ejemplar;
		},
		async updateEjemplar(obj, {id, input}){
			const ejemplar = await Ejemplar.findByIdAndUpdate(id, input);
			return ejemplar;
		},
		async deleteEjemplar(obj, {id}){
			await Ejemplar.deleteOne({_id: id});
			return {
				message: "ejemplar eliminado",
			};
		},
		async addCompra(obj, {input}){
			const compra = new Compra(input);
			await compra.save();
			return compra;
		},
		async updateCompra(obj, {id, input}){
			const compra = await Compra.findByIdAndUpdate(id, input);
			return compra;
		},
		async deleteCompra(obj, {id}){
			await Compra.deleteOne({_id: id});
			return {
				message: "compra eliminada",
			};
		},
		async addPrestamo(obj, {input}){
			const prestamo = new Prestamo(input);
			await prestamo.save();
			return prestamo;
		},
		async updatePrestamo(obj, {id, input}){
			const prestamo = await Prestamo.findByIdAndUpdate(id, input);
			return prestamo;
		},
		async deletePrestamo(obj, {id}){
			await Compra.deleteOne({_id: id});
			return {
				message: "prestamo eliminado",
			};
		},
		async addDetalleCompra(obj, {input}){
			let compraBus = await Compra.findById(input.compra);
			let ejemplarBus = await Ejemplar.findById(input.ejemplar);
			if (compraBus != null && ejemplarBus != null){
				const detalleCompra = new DetalleCompra({ compra: compraBus._id, ejemplar: ejemplarBus._id});
				await detalleCompra.save();
				return detalleCompra;
			} else {
				return null;
			}
		},
		async updateDetalleCompra(obj, {id, input}){
			let compraBus = await Compra.findById(input.compra);
			let ejemplarBus = await Ejemplar.findById(input.ejemplar);
			if (compraBus != null && ejemplarBus != null){
				const detalleCompra = await DetalleCompra.findByIdAndUpdate(id, { compra: compraBus._id, ejemplar: ejemplarBus._id});
				return detalleCompra;
			} else {
				return null;
			}
		},
		async deleteDetalleCompra(obj, {id}){
			await DetalleCompra.deleteOne({_id: id});
			return {
				message: "Detalle Compra eliminado",
			};
		},
		async addDetallePrestamo(obj, {input}){
			let prestamoBus = await Prestamo.findById(input.prestamo);
			let ejemplarBus = await Ejemplar.findById(input.ejemplar);
			if (prestamoBus != null && ejemplarBus != null){
				const detallePrestamo = new DetallePrestamo({ prestamo: prestamoBus._id, ejemplar: ejemplarBus._id});
				await detallePrestamo.save();
				return detallePrestamo;
			} else {
				return null;
			}
		},
		async updateDetallePrestamo(obj, {id, input}){
			let prestamoBus = await Prestamo.findById(input.prestamo);
			let ejemplarBus = await Ejemplar.findById(input.ejemplar);
			if (prestamoBus != null && ejemplarBus != null){
				const detallePrestamo = await DetallePrestamo.findByIdAndUpdate(id, { compra: prestamoBus._id, ejemplar: ejemplarBus._id});
				return detallePrestamo;
			} else {
				return null;
			}
		},
		async deleteDetallePrestamo(obj, {id}){
			await DetallePrestamo.deleteOne({_id: id});
			return {
				message: "Detalle Prestamo eliminado",
			};
		},
	}
}

let apolloServer = null;
const corsOptions = {
	origin: "http://localhost:8080",
	credentials : false
};

async function startServer(){
	const apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
	await apolloServer.start();

	apolloServer.applyMiddleware({app, cors: false});

}
startServer();
const app = express();
app.use(cors());
app.listen(8080, function(){
  	console.log("server arria");
})