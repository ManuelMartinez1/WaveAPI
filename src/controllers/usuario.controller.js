const usuariosCtrl = []

const instrumento = require('../modelos/instrumento.js');
//con base de datos
const usuario= require('../modelos/usuarios.js')
//con json
//const usuarios=require('../data.json');
usuariosCtrl.getUsuarioAlias = async(req,res)=>{
    const usuarios = await usuario.findOne({'instrumentos._id':'64628942e8b78da2ada81bb7'});
    res.json(usuarios);
}

usuariosCtrl.getIdByEmail = async (req, res) => {
    const { email } = req.params;
    try {
      const Usuario = await usuario.findOne({ correo: email });
      if (!Usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      const userId = Usuario._id; // Supongo que el campo _id contiene el ID de MongoDB
  
      return res.status(200).json({ userId });
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

usuariosCtrl.getUsuarios= async(req,res)=>{
    const usuarios= await usuario.find()
    res.json(usuarios)
}

usuariosCtrl.createUsuario = async(req, res) => {
    const newUsuario= new usuario(req.body);
    try{
        const savedUsuario = await newUsuario.save();
        res.status(201).send(savedUsuario);
    }catch (err){
        res.status(500).send({message: 'Error creating user', error: err});
    }
}

usuariosCtrl.getUsuario=async(req,res)=>{
    const usuarioF=await usuario.findById(req.params.id)
    res.send(usuarioF);
}
usuariosCtrl.deleteUsuarios=async(req,res)=>{
    const usuarioF = await usuario.deleteMany({});
    res.send({message: 'usuarios eliminado', usuarioF});
}

usuariosCtrl.deleteUsuario=async(req,res)=>{
    const usuarioF=await usuario.findByIdAndDelete(req.params.id);
    res.send({message: 'usuario eliminado', usuarioF});
}

usuariosCtrl.updateUsuario=async(req,res)=>{
    const usuarioF=await usuario.findByIdAndUpdate(req.params.id,req.body);
    res.send({message: 'se actualizó el usuario', usuarioF});
}

usuariosCtrl.getUsuarioByInstrument = async (req,res)=>{
    const Instrumento = await instrumento.findOne({_id: req.params.id});

    const usuarios = await usuario.find({
        instrumentos: Instrumento._id
    });
    res.json(usuarios);
}


module.exports = usuariosCtrl;