import mongoose from 'mongoose'

const entregadorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    nome: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: false,
      trim: true
    },
    telefone: {
      type: String,
      required: true
    },
    veiculo: {
      tipo: {
        type: String,
        enum: ['moto', 'bicicleta', 'carro', 'a_pe'],
        required: true
      },
      placa: { type: String }
    },
    status: {
      type: String,
      enum: ['disponivel', 'ocupado', 'offline'],
      default: 'offline'
    },
    ativo: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true, collection: 'entregadores' }
);

export const Entregador = mongoose.model('Entregador', entregadorSchema);
