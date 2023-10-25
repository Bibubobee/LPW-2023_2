const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//const {graphqlExpress,graphiqlExpress} = require("graphql-server-express");
const {makeExcecutableSchema} = require("graphql-tools")

const {merge} = require("lodash")
const {ApolloServer, gql} = require("apollo-server-express");

const Usuario =require("./models/usuario")
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
  type Query{
    getUsuarios : [Usuario]
    getUsuario(id: ID!) : Usuario 
  }
  type Mutation{
    addUsuario(input: UsuarioInput) : Usuario
    updateUsuario(id: ID!, input: UsuarioInput) : Usuario
    deleteUsuario(id:ID!) : Alert
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
    }
  },
  Mutation:{
    async addUsuario(obj, {input}){
      const usuario = new Usuario(ipnut);
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
    }
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