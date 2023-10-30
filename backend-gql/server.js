const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//const {graphqlExpress,graphiqlExpress} = require("graphql-server-express");
const {makeExcecutableSchema} = require("graphql-tools")

const {merge} = require("lodash")
const {ApolloServer, gql} = require("apollo-server-express");

const Usuario =require("./models/usuario");
const Perfil =require("./models/perfil");
const Libro =require("./models/libro");
const Genero =require("./models/genero");
const UsuarioPerfil =require("./models/usuarioPerfil");
const LibroGenero =require("./models/libroGenero");
const { ObjectId } = require("mongodb");

mongoose.connect("mongodb+srv://admin:admin1234@cluster0.1qndxpt.mongodb.net/Iguano",{useNewUrlParser: true,useUnifiedTopology:true});

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
	type Perfil{
		id: ID!
		tipo: String!
	}
	type UsuarioPerfil{
		id: ID!
		usuario: String
		perfil: String
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
		libro: String
		genero: String
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
	}
	type Mutation{
		addUsuario(input: UsuarioInput) : Usuario
		updateUsuario(id: ID!, input: UsuarioInput) : Usuario
		deleteUsuario(id: ID!) : Alert
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
			const usuarioPerfil = await UsuarioPerfil.find({usuario : idUsuario}).populate('usuario');
			return usuarioPerfil;
		},
		async getUsuarioPerfil(obj, {idUsuario, idPerfil}){
			const usuarioPerfil = await UsuarioPerfil.find({ usuario : idUsuario, perfil : idPerfil}).populate('usuario').populate('perfil');
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
			const libroGenero = await LibroGenero.find({ libro : idLibro}).populate('libro').populate('genero');
			return libroGenero;
		},
		async getLibroGenero(obj, {idLibro, idGenero}){
			const libroGenero = await LibroGenero.find({ libro : idLibro, genero : idGenero}).populate('libro').populate('genero');
			return libroGenero;
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
				const usuarioPerfil = UsuarioPerfil.findByIdAndUpdate({ usuario: usuarioBus._id, perfil: perfilBus._id});
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
				const libroGenero = LibroGenero.findByIdAndUpdate({ libro: libroBus._id, genero: generoBus._id});
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