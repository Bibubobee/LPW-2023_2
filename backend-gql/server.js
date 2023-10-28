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

mongoose.connect("mongodb+srv://admin:admin1234@test.skpqw50.mongodb.net/iguano",{useNewUrlParser: true,useUnifiedTopology:true});

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
		tip: String!
	}
	type Libro{
		id: ID!
		nombre: String!
		anno: Number!
		copias: Number!
		autor: String!
		sinopsis: String!
		foto: String!
	}
	type Genero{
		id: ID!
		nombre: String!
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
	type PerfilInput{
		nombre: String!
		anno: Number!
		copias: Number!
		autor: String!
		sinopsis: String!
		foto: String!
	}
	type LibroInput{
		nombre: String!
		anno: Number!
		copias: Number!
		autor: String!
		sinopsis: String!
		foto: String!
	}
	type GeneroInput{
		nombre: String!
	}
	type Query{
		getUsuarios : [Usuario]
		getUsuario(id: ID!) : Usuario 
		getPerfiles : [Perfil]
		getPerfil(id: ID!) : Perfil
		getLibros : [Libro]
		getLibro(id: ID!) : Libro
		getGeneros : [Genero]
		getGenero(id: ID!) : Genero
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


	}
`;

const resolvers = {
	Query:{
		async getUsuarios(obj){
			const usuarios = await Usuario.find();
			return usuarios;
		},
		async getUsuario(obj, {id}){
			const usuario = Usuario.findById(id);
			return usuario;
		},
		async getPerfiles(obj){
			const perfiles = await Perfil.find();
			return perfiles;
		},
		async getPerfil(obj, {id}){
			const perfil = Perfil.findById(id);
			return perfil;
		},
		async getLibros(obj){
			const libros = await Libro.find();
			return libros;
		},
		async getlibro(obj, {id}){
			const libro = Libro.findById(id);
			return libro;
		},
		async getGeneros(obj){
			const generos = await Genero.find();
			return generos;
		},
		async getGenero(obj, {id}){
			const genero = Genero.findById(id);
			return genero;
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