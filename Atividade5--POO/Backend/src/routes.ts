import { Router } from "express";
import { createClienteControl, getClienteById, getClientes, updateCliente, deleteCliente } from "./controllers/clientesControl";
import { createProdutoControl, getProdutoByIdControl, getProdutosControl, updtateProdutoControl, deleteProdutoControl } from "./controllers/produtosControl";
import { createServicoControl, getServicoByIdControl, getServicosControl, updateServicoControl, deleteServicoControl } from "./controllers/servicosControl";
import { comprarProduto, listarComprasProdutos } from "./controllers/compraProdutoControl";
import { comprarServico, listarComprasServicos } from "./controllers/compraServicoControl";

const router = Router();

// ROTAS CLIENTES
router.post('/clientes', createClienteControl);           
router.post('/clientes/cadastrar', createClienteControl); 
router.get('/clientes', getClientes);
router.get('/clientes/:id', getClienteById);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);

// ROTAS PRODUTOS
router.post('/produtos', createProdutoControl);
router.get('/produtos', getProdutosControl);
router.get('/produtos/:id', getProdutoByIdControl);
router.put('/produtos/:id', updtateProdutoControl);
router.delete('/produtos/:id', deleteProdutoControl);   

// ROTAS SERVIÇOS
router.post('/servicos', createServicoControl);
router.get('/servicos', getServicosControl);
router.get('/servicos/:id', getServicoByIdControl);
router.put('/servicos/:id', updateServicoControl);
router.delete('/servicos/:id', deleteServicoControl);

// ROTAS COMPRAS_PRODUTOS
router.post('/compras_produtos', comprarProduto);
router.get('/compras_produtos', listarComprasProdutos);

// ROTAS COMPRAS_SERVIÇOS
router.post('/compras_servicos', comprarServico);
router.get('/compras_servicos', listarComprasServicos);

export default router;
