import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';
import { converterData } from '../../utils/conversor';

//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa: number,
  tituloTarefa: string,
  descricaoTarefa: string,
  inicioTarefa: string,
  fimTarefa: string,
  statusTarefa: string,
  recursoTarefa: string,
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

//Definição do array contendo os dados iniciais da listagem de tarefas
const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01 08:00:01', '2022-01-02 16:55:31', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03 10:27:13', '2022-01-04 10:00:00', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2022-01-04 09:34:19', '2022-01-05 15:01:10', 'Em Andamento', 'Recurso 3'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2022-01-05 11:33:17', '2022-01-06 17:59:57', 'Em Andamento', 'Recurso 4'),
];

//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openDeletar, setOpenDeletar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState(0);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleCloseDeletar = () => setOpenDeletar(!openDeletar);

  const handleDeletar = (id) => {
    setIdTarefaSelecionada(id);
    setOpenDeletar(!openDeletar);
  };

  const handleConfirmarDeletar = () => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== idTarefaSelecionada;
      }),
    );
    setIdTarefaSelecionada(0);
    setOpenDeletar(!openDeletar);
  };

  return(
    <>
      <Card>
        <CardHeader
          title="Atividades"
          subheader="Listagem de Atividades"
        /> 
        <CardContent>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="center">Título</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Data de Início</TableCell>
                    <TableCell align="center">Data de Finalização</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Recurso</TableCell>
                    <TableCell align="center">Ações</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tarefas.map((row, indice) => (
                    <TableRow
                    key={indice}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                          {row.idTarefa}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                          {row.tituloTarefa}
                      </TableCell>
                      <TableCell align="left">{row.descricaoTarefa}</TableCell>
                      <TableCell align="center">{converterData(row.inicioTarefa)}</TableCell>
                      <TableCell align="center">{converterData(row.fimTarefa)}</TableCell>
                      <TableCell align="left">{row.statusTarefa}</TableCell>
                      <TableCell align="left">{row.recursoTarefa}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}><EditIcon fontSize="small" /></Button>
                        {" "}   
                        <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}><DeleteIcon fontSize="small" /></Button>            
                      </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </CardContent>
        <CardActions>
            <Button size="large" variant="contained" onClick={handleOpen}>Criar Atividade</Button>
      </CardActions> 
    </Card>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
    <div>
      <Modal
        open={openEditar}
        onClose={handleCloseEditar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>  
    </div>
    <div>
      <Dialog
        open={openDeletar}
        onClose={handleCloseDeletar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja realmente excluir a tarefa?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Essa ação não poderá ser desfeita!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleCloseDeletar}>Cancelar</Button>
          <Button variant="outlined" color="error" onClick={handleConfirmarDeletar} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </>    
 );
};
 
export default ListarTarefa;