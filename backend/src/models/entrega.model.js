import mongoose from 'mongoose'

const entregaSchema = new mongoose.Schema(
  {
    entregador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Entregador',
      default: null // pode não ter entregador ainda, se estiver na fila
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cliente',
      required: true
    },
    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pedido'
    },
    enderecoOrigem: {
      logradouro: String,
      numero: String,
      bairro: String,
      cidade: String,
    },
    enderecoDestino: {
      logradouro: String,
      numero: String,
      bairro: String,
      cidade: String,
    },
    status: {
      type: String,
      enum: ['pendente', 'a_caminho', 'entregue', 'cancelada'],
      default: 'pendente'
    },
    dataSaida: {
      type: Date
    },
    dataEntrega: {
      type: Date
    },
    valorFrete: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// índice para acelerar a query de "entregadores com entrega ativa"
entregaSchema.index({ entregador: 1, status: 1 });

export const Entrega = mongoose.model('Entrega', entregaSchema);
